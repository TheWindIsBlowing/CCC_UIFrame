import BaseUI from "./BaseUI";
import { Tip } from "./ObjectScripts/Tip";

const { ccclass, property } = cc._decorator;

@ccclass
export class TipLayer extends BaseUI {
    protected static className = "TipLayer";
    @property(cc.Prefab)
    tipPrefab: cc.Prefab = null;

    private tipPool: Tip[] = [];
    private targetPriority: number = 3000;
    public showTip(_message: string, isEnergy: boolean = false) {
        for (let i = 0; i < this.tipPool.length; ++i) {
            if (this.tipPool[i] != null && this.tipPool[i].getIsReady()) {
                this.tipPool[i].playTip(_message, isEnergy);
                return;
            }
        }
        cc.log("instantiate Tip");
        let tipNode: cc.Node = cc.instantiate(this.tipPrefab);
        tipNode.parent = this.node;
        tipNode.zIndex = this.targetPriority++;
        let tip = tipNode.getComponent(Tip);
        this.tipPool.push(tip);
        tip.playTip(_message, isEnergy);
    }


}
