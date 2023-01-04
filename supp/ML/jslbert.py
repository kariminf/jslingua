#!/usr/bin/env python
# -*- coding: utf-8 -*-

#  Copyright 2023 Abdelkrime Aries <kariminfo0@gmail.com>
#
#  ---- AUTHORS ----
# 2023	Abdelkrime Aries <kariminfo0@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import tensorflow as tf 
import numpy as np
from tensorflow import keras
from keras.layers import Layer, LayerNormalization, Dense, MultiHeadAttention, CategoryEncoding


class MaskedLoss(tf.keras.losses.Loss):
    def __init__(self):
        self.name = 'masked_loss'
        self.loss = tf.keras.losses.SparseCategoricalCrossentropy(
            from_logits = False, 
            reduction   = 'none'
            )

    def __call__(self, y_true, y_pred):

        # Calculate the loss for each item in the batch.
        loss  = self.loss(y_true, y_pred)

        # Mask off the losses on padding.
        mask  = tf.cast(y_true != 0, tf.float32)
        loss *= mask

        # Return the total.
        return tf.reduce_sum(loss)

class JslBERTBlock(Layer):
    def __init__(self, d_mdl, h):
        super(JslBERTBlock, self).__init__()
        self.lma = MultiHeadAttention(h, key_dim=d_mdl)
        self.addnorm1 = LayerNormalization()
        self.addnorm2 = LayerNormalization()
        self.ffp = Dense(d_mdl, name="block_out")

    def call(self, Q, K, V, M):
        out = self.lma(Q, K, V, M)
        out = self.addnorm1(out)
        out = self.ffp(out)
        return self.addnorm2(out)

class JslBERT(tf.keras.Model):
    def __init__(self, blocks_nbr, d_model, heads_nbr, vocab_size, max_length, mask_rate=0.2):
        super(JslBERT, self).__init__()
        self.tokEmb = Dense(d_model, name="Tok_embedding")
        self.posEmb = Dense(d_model, name="Pos_embedding")
        self.segEmb = Dense(d_model, name="Seg_embedding")
        self.blocks = []
        for i in range(blocks_nbr):
            self.blocks.append(JslBERTBlock(d_model, heads_nbr))
        self.cls = Dense(1, activation="sigmoid", name="Is_next")
        self.tok = Dense(vocab_size, activation="softmax", name="Token")

        self.vocab_size = vocab_size
        self.max_length = max_length
        self.mask_rate = mask_rate

        self.PAD = 0
        self.UNK = 1
        self.CLS = 2
        self.SEP = 3
        self.MASK = 4

        self.no_masking = tf.constant([self.PAD, self.CLS, self.SEP])

        self.cls_loss = tf.keras.metrics.binary_crossentropy
        self.tok_loss = MaskedLoss()

    def _mask(self, X):
        tile_shape = tf.concat([tf.ones(tf.shape(tf.shape(X)), dtype=tf.int32), tf.shape(self.no_masking)], axis=0)
        X_tile = tf.tile(tf.expand_dims(X, -1), tile_shape)
        Mask_mask = tf.reduce_any(tf.equal(X_tile, self.no_masking), -1)
        Mask_mask = tf.logical_not(Mask_mask)

        Mask_mask = tf.logical_and(Mask_mask, tf.random.uniform(tf.shape(X)) <= self.mask_rate) 

        return tf.where(Mask_mask, self.MASK, X)

    def train_step(self, data):
        # Tok, Pos, Seg, Mask, Y = data["Tok"], data["Pos"], data["Seg"], data["Mask"], data["Y"]
        X, Y = data
        X = tf.cast(X, tf.int32)

        with tf.GradientTape() as tape:
            logits = self.encode(X, train=True)
            cls_logits = self.cls(logits[:, 0, :])
            cls_loss = tf.reduce_sum(self.cls_loss(Y, cls_logits))

            tok_logits = self.tok(logits[:, 1:, :])
            tok_loss = self.tok_loss(X[:, 0, 1:], tok_logits)

            loss = cls_loss + tok_loss
        
        variables = self.trainable_variables 
        gradients = tape.gradient(loss, variables)
        self.optimizer.apply_gradients(zip(gradients, variables))
        
            
        return {"cls_loss": cls_loss, "tok_loss": tok_loss}

    def encode(self, X, train=False):
        Mask = X[:, 0, :] != self.PAD
        if train:
            Tok = tf.one_hot(self._mask(X[:, 0, :]), self.vocab_size, axis=-1)
        else:
            Tok = tf.one_hot(X[:, 0, :], self.vocab_size, axis=-1)
        Pos = tf.one_hot(X[:, 1, :], self.max_length, axis=-1)
        Seg = tf.one_hot(X[:, 2, :], 2, axis=-1)

        Tokemb = self.tokEmb(Tok)
        Posemb = self.posEmb(Pos)
        Segemb = self.segEmb(Seg)

        Word = Tokemb + Posemb + Segemb

        res = Word

        for block in self.blocks:
            res = block(res, res, res, Mask)

        return res
