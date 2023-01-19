import EngSem from "../../src/eng/eng.sem.mjs";

import {Activation, Perceptron, LayerNormalization, BeamMEMM, JslBERTBlock, JslBERT} from "../../src/_jslml.mjs";


const tok_emb_w = [
  [-1. ,  0.1,  0.6, -0.3,  0.3,  0.6, -0.7],
  [ 0.5, -0.5, -0.7, -0.3, -0.2, -0.3, -0.2],
  [-0.5,  0.6,  0.2,  0.7,  0.2,  0.6,  0.7],
  [-0.5,  0.4,  0.7,  0.6,  0. ,  0.4, -0.3]];

const pos_emb_w = [
  [-1. ,  0.1,  0.6, -0.3,  0.3,  0.6],
  [ 0.5, -0.5, -0.7, -0.3, -0.2, -0.3],
  [-0.5,  0.6,  0.2,  0.7,  0.2,  0.6],
  [-0.5,  0.4,  0.7,  0.6,  0. ,  0.4]
];

const seg_emb_w = [
  [-1. ,  0.1],
  [ 0.5, -0.5],
  [-0.5,  0.6],
  [-0.5,  0.4]
];

const emb_b = [0.1, 0.2, 0.3, 0.4];

const block0_h0_w = [
  [-0.2,  0.4,  0.4,  0.3],
  [ 0.1,  0.5,  0.3,  0.3],
  [ 0.5, -0.4,  0.3,  0.2]];

const block0_h1_w = [
  [-0.3,  0.5, -0.1,  0.2],
  [ 0.3, -0.1, -0.1, -0.2],
  [-0.2, -0.2, -0.3,  0.2]
];

const block0_h0_b = [-0.1, -0.2, -0.3],
      block0_h1_b = [0.1,  0.2, 0.3];

const block0_hp_w = [[ 0.6,  0.6,  0.2, -0.2, -0.3, -0.6],
                    [-0.1,  0.5, -0.3,  0.6, -0.6,  0.1],
                    [-0.6,  0.3,  0.2, -0.1, -0.1, -0.1],
                    [-0.5, -0.5, -0.4, -0.2, -0.2, -0.6]];

const block0_hp_b = [0.0, -0.1, -0.2,  0.3];

const block0_ffp_w = [[ 0.3,  0.5, -0.8, -0.6],
[-0.1,  0.6,  0.8, -0.8],
[ 0.1, -0.6,  0.5, -0.2],
[-0.8,  0.1, -0.9,  0. ]];

const block0_ffp_b = [0.4, 0.1, 0.2,  0.3];

//PERCETRONS
const tok_emb_p = new Perceptron(tok_emb_w, emb_b),
      pos_emb_p = new Perceptron(pos_emb_w, emb_b),
      seg_emb_p = new Perceptron(seg_emb_w, emb_b),
      block0_h0_k_p = new Perceptron(block0_h0_w, block0_h0_b),
      block0_h1_k_p = new Perceptron(block0_h1_w, block0_h1_b),
      block0_h0_q_p = new Perceptron(block0_h0_w, block0_h0_b),
      block0_h1_q_p = new Perceptron(block0_h1_w, block0_h1_b),
      block0_h0_v_p = new Perceptron(block0_h0_w, block0_h0_b),
      block0_h1_v_p = new Perceptron(block0_h1_w, block0_h1_b),
      block0_hp_p = new Perceptron(block0_hp_w, block0_hp_b),
      block0_ffp_p = new Perceptron(block0_ffp_w, block0_ffp_b);

//Layer normalisation
const gamma = [1, 0.8, 0.75, 0.5],
      beta = [0.1, 0.2, 0.3, 0.4];
const ln1 = new LayerNormalization(beta, gamma),
      ln2 = new LayerNormalization(beta, gamma);

//Blocks
const heads = [[block0_h0_q_p, block0_h0_k_p, block0_h0_v_p], 
               [block0_h1_q_p, block0_h1_k_p, block0_h1_v_p]],
block0 = new JslBERTBlock(heads, block0_hp_p, block0_ffp_p, ln1, ln2);

//JslBERT
const brt = new JslBERT([tok_emb_p, pos_emb_p, seg_emb_p], [block0]);


// const X0 = [[[6, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0]]]

const X = [
  [[0,0,0,0,0,0,1], [1,0,0,0,0,0], [1, 0]],
  [[0,1,0,0,0,0,0], [0,1,0,0,0,0], [1, 0]],
  [[0,0,1,0,0,0,0], [0,0,1,0,0,0], [1, 0]],
  [[0,0,0,1,0,0,0], [0,0,0,1,0,0], [1, 0]],
  [[1,0,0,0,0,0,0], [0,0,0,0,1,0], [1, 0]],
  [[1,0,0,0,0,0,0], [0,0,0,0,0,1], [1, 0]]
]

const Mask = [1,1,1,1,0,0]

const wemb = brt.predict(X, Mask);

console.log("EMB", wemb);


// const p = new Perceptron([[1, 2, 3], [4, 5, 6]], [1, -1]);
// const x = [1, -1, 1];

// console.log(p.predict(x));

// console.log(EngSem);
// console.log(EngSem.__word2BERTCodes("cat"));
// console.log(EngSem.word_embedding("cat"));
// console.log(EngSem.word_embedding("Dog"));