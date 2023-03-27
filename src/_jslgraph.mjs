/**
 * Graph structures
 * @module jslgraph
 */


class JslNode{
    constructor(value){
        this.value = value;
        this.children = [];
    }

    add_child(child){
        this.children.push(child);
    }

}

export default JslNode;