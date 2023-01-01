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
    softmax: (X) => {
        const max = Math.max(...X);
        const s = X.map(x => Math.exp(x - max));
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

/**
 * 
 * @param {*} X 
 * @returns 
 */
const argmax = X => [].reduce.call(X, (res, x, i) => x > X[res] ? i : res, 0);

const zip = (X, Y) => X.map((x, i) => [x, Y[i]]);

const get_k_max = (X, k) => X.sort(([k1, v1], [k2, v2]) => v2 - v1).slice(0, k);


//==========================================
// NEURON API
//==========================================

class Neuron {

    constructor(w, b, activate=Activation.sigmoid, cls_names=[], th=0.5){
        this.w = w;
        this.b = b;
        this.activate = activate;
        this.muliclass = Array.isArray(b);
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
            for(let i = 0; i < this.w.length; i++) cls.push(dot(this.w[i], x) + this.b[i]);
        }
        else { //binary
            cls = dot(this.w, x) + this.b;
        } 
        
        cls = this.activate(cls);
        return prob ? cls : this.get_class(cls);
    }

    get_class(p){
        if(this.muliclass) return this.cls_names[argmax(p)];
        return p < th ? this.cls_names[0] : this.cls_names[1];
    }

}


//==========================================
// SEQUENCE TAGGING API
//==========================================

class EmptyNeuron{
    predict(x){return x;}
}

class TagEncoder{
    constructor(tag_list, embedding=new EmptyNeuron()){
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
            result.push(this.maxent.get_class(next_e[0][0]));
            j = next_e[0][1];
            i--;
        }
        return result;   
    }
}


export default MaxEnt;