export default class NodePool {
    pool = new Array<cc.Node>();

    pop() {
        if (this.pool.length <= 0) {
            let node = new cc.Node();
            // node.addComponent(cc.Sprite);
            return node;
        } else {
            return this.pool.pop();
        }
    }

    push(node: cc.Node) {
        this.pool.push(node);
    }

    pushAll(nodes: cc.Node[]) {
        for (let node of nodes) {
            this.push(node);
        }
    }

    popPrefab(prefab: cc.Prefab) {
        if (this.pool.length <= 0) {
            let node = cc.instantiate(prefab);
            return node;
        } else {
            return this.pool.pop();
        }
    }
}