/**
 * Machine learning
 * @module jslml
 */


//==========================================
// ACTIVATION FUNCTIONS
//==========================================

const Activation = {
    tanh: (X) => X.map(x => 2/(1 + Math.exp(-2*x)) - 1),
    sigmoid: (X) => X.map(x => 1/(1 + Math.exp(-x))),
    linear: (X) => X,
    relu: (X) => X.map(x => x < 0 ? 0 : x),
    softmax: (X) => {
        const max = Math.max(...X);
        const s = X.map(x => Math.exp(x - max));
        const sum = s.reduce((c, e) => c + e);
        return s.map(e => e/sum);
    },
    masked_softmax: (X, M) => {
        // const a = - 1000000000; 
        // // const max = Math.max(...X);
        // const s = X.map((x, i) => Math.exp(x + (1-M[i])*a));
        // const sum = s.reduce((c, e) => c + e);
        // return s.map(e => e/sum);
 
        const max = Math.max(...X);
        const s = X.map((x, i) => M[i]? Math.exp(x-max): 0);
        const sum = s.reduce((c, e) => c + e);
        return s.map(e => e/sum);
    }
};

//==========================================
// LIST FUNCTIONS
//==========================================

/**
 * 
 */
const dot = (X, Y) => X.map((x, i) => x * Y[i]).reduce((e0, e1) => e0 + e1);

// const matmul = (X, Y) => X.map((x, i) => x * Y[i]);

const svmul = (s, V) => V.map((v, i) => v * s);

const scaledot = (X, Y) => dot(X, Y)/Math.sqrt(X.length);

const zeros = N => new Array(N).fill(0);

const uniform = N => new Array(N).fill(1/N);

const full = (N, x) => new Array(N).fill(x);

/**
 * 
 * @param {*} X 
 * @returns 
 */
const argmax = X => [].reduce.call(X, (res, x, i) => x > X[res] ? i : res, 0);

const zip = (X, Y) => X.map((x, i) => [x, Y[i]]);

const get_k_max = (X, k) => X.sort(([k1, v1], [k2, v2]) => v2 - v1).slice(0, k);

const vplus3 = (X, Y, Z) => X.map((x, i) => x + Y[i] + Z[i]);

const vplus2 = (X, Y) => X.map((x, i) => x + Y[i]);

// const vminus2 = (X, Y) => X.map((x, i) => x - Y[i]);

const vsum = (X) => X.reduce((c, e) => c + e);

// const mean2D = X => X.reduce((c, x) => vplus2(c, x), zeros(X[0].length)).map(x => x /X.length);

// const vminuspow2 = (X, Y) => X.map((x, i) => Math.pow(x - Y[i], 2));

// const sigma2D = (X, Mu, eps) => X.reduce((c, x) => vplus2(c, vminuspow2(x, Mu)), zeros(X[0].length))
                            // .map(x => Math.sqrt(eps + x/X.length));

// const norm = (X) => {
//     const mean = vsum(X)/X.length;
//     const sigma = Math.sqrt(X.reduce((c, e) => c + Math.pow(e - mean, 2), 0)/X.length);
//     return X.map(e => (e - mean)/sigma);
// };

const norm_param = (X, beta, gamma, epsilon=0.00001) => {
    const mean = vsum(X)/X.length;
    const sigma = Math.sqrt(epsilon + X.reduce((c, e) => c + Math.pow(e - mean, 2), 0)/X.length);
    return X.map((e, i) => beta[i] + (gamma[i] * (e - mean)/sigma));
};

const transpose = (X) => X[0].map((col, i) => X.map(row => row[i]));


//==========================================
// NEURAL API
//==========================================

class Perceptron {

    constructor(weights, bias, activate=null, cls_names=[], th=0.5){
        this.weights = weights;
        this.bias = bias;
        this.activate = activate;
        this.muliclass = Array.isArray(bias);
        if (!cls_names || !cls_names.length) this.cls_names = ["Neg", "Pos"];
        else this.cls_names = cls_names;
    }

    predict_all(X, prob=true){
        return X.map(x => this.predict(x, prob));
    }

    predict(x, prob=true){
        let cls = 0;
        if(this.muliclass){
            cls = [];
            for(let i = 0; i < this.weights.length; i++) cls.push(dot(this.weights[i], x) + this.bias[i]);
        }
        else { //binary
            cls = dot(this.weights, x) + this.bias;
        } 
        
        if (this.activate) cls = this.activate(cls);
        return prob ? cls : this.get_class(cls);
    }

    get_class(p){
        if(this.muliclass) return this.cls_names[argmax(p)];
        return p < th ? this.cls_names[0] : this.cls_names[1];
    }

}

class LayerNormalization {
    constructor(beta, gamma, epsilon=0.001){
        this.beta = beta;
        this.gamma = gamma;
        this.epsilon = epsilon;
    }

    predict(X){// [[...], [...], ...]
        return X.map((x, i) => norm_param(x, this.beta, this.gamma, this.epsilon), this);    
    }
}

class JslBERTBlock {
    /**
     * 
     * @param {Perceptron[[]]} encoders h head in each head 3 Perceptrons (Q, K, V)
     */
    constructor(encoders, hp, ffp, ln1, ln2){
        this.encoders = encoders;
        this.hp = hp;
        this.ffp = ffp;
        this.ln1 = ln1;
        this.ln2 = ln2;
    }

    predict(Q, K, V, Mv, Mq){ //vectors [[WORD-ENC], [], ...]

        const   Mvdef = Array.isArray(Mv) && (Mv.length == V.length),
                Mqdef = Array.isArray(Mq) && (Mq.length == Q.length);

        let Q_enc_head = []; // h X n X d
        let K_enc_head = []; // h X m X d
        let V_enc_head = []; // h X m X d

        this.encoders.forEach(QKVenc => {
            Q_enc_head.push(QKVenc[0].predict_all(Q));
            K_enc_head.push(QKVenc[1].predict_all(K));
            V_enc_head.push(QKVenc[2].predict_all(V));
        }, this);

        Q_enc_head = transpose(Q_enc_head); //n X h X d
        K_enc_head = transpose(K_enc_head); //m X h X d
        V_enc_head = transpose(V_enc_head); //m X h X d

        let result = [];

        Q_enc_head.forEach((Qi, i) => { //over n target words
            let headi = [];
            for(let h = 0; h < this.encoders.length; h++){//over h heads
                let perc = [];
                if (!Mqdef || Mq[i]){
                    K_enc_head.forEach((Kj, j) => {//over m source words
                        if (Mvdef && !Mv[j]) perc.push(0)
                        else perc.push(scaledot(Qi[h], Kj[h]));
                    }, this);
                    if (Mvdef) perc = Activation.masked_softmax(perc, Mv);
                    else perc = Activation.softmax(perc);
                }else{//if no attention for this query, we add a uniform attention
                    perc = uniform(K_enc_head.length);
                }

                // console.log(perc);

                const Ri = V_enc_head.reduce((C, Vj, j) => vplus2(C, svmul(perc[j], Vj[h])), 
                                                            zeros(V_enc_head[0][0].length));
                
                headi = headi.concat(Ri);
            }

            result.push(headi);

        }, this);

        result = this.hp.predict_all(result);

        // console.log("V", V);

        // console.log("lma", result);

        //add and norm
        result = result.map((r, i) => vplus2(r, V[i]));
        result = this.ln1.predict(result);
        // console.log("addnorm1", result);
        //Feed-Forward
        result = this.ffp.predict_all(result);
        // console.log("FFP", result);
        //add and norm
        result = result.map((r, i) => vplus2(r, V[i]));
        // console.log("ADD", result);
        return this.ln2.predict(result);
    }
}

class JslBERT {
    /**
     * 
     * @param {Perceptron[]} encoders encoders for inputs embedding (token, position, segment)
     * @param {JslBERTBlock[]} blocks stacked blocks for incoding 
     */
    constructor(encoders, blocks, masked=false){
        this.encoders = encoders;
        this.blocks = blocks;
        this.masked = masked;
    }

    predict(X){// X = [[[TOKEN], [POSITION], [SEGMENT]], [[], [], []], ...]
        
        //incoding inputs
        let X_enc = [];
        X.forEach((x, i) =>{
            let tok_emb = this.encoders[0].predict(x[0]);
            let pos_emb = this.encoders[1].predict(x[1]);
            let seg_emb = this.encoders[2].predict(x[2]);
            let x_emb = vplus3(tok_emb, pos_emb, seg_emb);
            X_enc.push(x_emb);
        }, this);

        // console.log("Word", X_enc);

        //the mask, when the token starts with 1 then 0; otherwise 1
        const M = this.masked? X.map(x => 1 - x[0][0]): undefined;

        // console.log("Mask", M);

        this.blocks.forEach(block => {
            X_enc = block.predict(X_enc, X_enc, X_enc, M, M);
        }, this);

        return X_enc;
    }
}


//==========================================
// SEQUENCE TAGGING API
//==========================================

// class EmptyNeuron{
//     predict(x){return x;}
// }

class TagEncoder{
    
    constructor(tag_list, embedding={predict: x => x}){//new EmptyNeuron()
        this.tag_list = tag_list;
        this.embedding = embedding;
    }

    encode(tag){
        return this.embedding.predict(this.tag_list.map(e => ~~(e===tag)));
    }
}


class BeamMEMM {
    constructor(k, maxent, tg=null){
        this.k = k;
        this.maxent = maxent;
        this.tg = tg || new TagEncoder(maxent.cls_names);
    }

    init(x){
        this.BV = [];
        const newx = this.tg.encode("<s>").concat(x);
        const p = this.maxent.predict(newx, true).map(e => Math.log(e));
        const past_i = Array(p.length).fill(-1);
        this.BV.push(get_k_max(zip(zip(this.maxent.cls_names, past_i), p), this.k));
    }

    step(x){
        const past = this.BV[this.BV.length-1];
        const choices = [];
        past.array.forEach((e, i) => {
            const past_tag = this.tg.encode(e[0][0]);
            const newx = this.tg.encode(past_tag).concat(x);
            const p = this.maxent.predict(newx, true).map(pi => e[1] + Math.log(pi));
            const past_i = Array(p.length).fill(i);
            choices.push(zip(zip(this.maxent.cls_names, past_i), p));
        }, this);

        this.BV.push(get_k_max(choices, this.k));
    }

    final(){
        let i = this.BV.length - 1;
        const result = [];
        let j = 0; //since the first one is the max
        while(i > 0){
            next_e = this.BV[i][j];
            result.unshift(this.maxent.get_class(next_e[0][0]));
            j = next_e[0][1];
            i--;
        }
        return result;   
    }
}


export  {Activation, LayerNormalization, Perceptron, TagEncoder, BeamMEMM, JslBERTBlock, JslBERT};