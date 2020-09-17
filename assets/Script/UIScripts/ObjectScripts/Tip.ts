
const { ccclass, property } = cc._decorator;

@ccclass
export class Tip extends cc.Component {

    @property(cc.Label)
    tipLabel: cc.Label = null;

    private isReady: boolean = true;
    private isEnergy: boolean = false;

    public playTip(_message: string, isEnergy: boolean = false) {
        this.isEnergy = isEnergy;
        cc.tween(this.node).stop();
        this.tipLabel.string = _message;
        this.resetLabelInfo();
        cc.tween(this.node)
            .by(1, { position: cc.v2(0, 200) })
            .call(() => {
                this.node.scale = 0;
                this.isReady = true;
                this.node.active = false;
            })
            .start();
    }
    private resetLabelInfo() {
        this.node.active = true;
        if(this.isEnergy) {
            this.node.getChildByName("energy").active = true;
            this.node.getChildByName("bg").active = false;
            this.tipLabel.node.x = 30;
        }
        else {
            this.node.getChildByName("energy").active = false;
            this.node.getChildByName("bg").active = true;
            this.tipLabel.node.x = 0;
        }
        this.isReady = false;
        this.node.setPosition(cc.v2(0, 0));
        this.node.setScale(cc.v2(1, 1));
    }
    public getIsReady(): boolean {
        return this.isReady;
    }
}
