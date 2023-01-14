import EngSem from "../../src/eng/eng.sem.mjs";

import {Activation, Perceptron, TagEncoder, BeamMEMM, JslBERTBlock, JslBERT} from "../../src/_jslml.mjs";

// const p = new Perceptron([[1, 2, 3], [4, 5, 6]], [1, -1]);
// const x = [1, -1, 1];

// console.log(p.predict(x));

// console.log(EngSem);
console.log(EngSem.word_embedding("cat"));
// console.log(EngSem.word_embedding("Dog"));