import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlurUtil extends cc.Component {

    @property(cc.Sprite)
    blurBg: cc.Sprite = null;

    onEnable() {
        ListenerManager.getInstance().trigger(ListenerType.Capture_Screen, (texture: cc.RenderTexture) => {
            this.blurBg.spriteFrame = new cc.SpriteFrame(texture);
            let canvas = cc.Canvas.instance.node;
            
            this.blurBg.node.setContentSize(canvas.width, canvas.height);
        });
    }


    onDisable() {
        this.clearBlur();
    }

    clearBlur() {
        this.blurBg.spriteFrame = null;
    }

}
