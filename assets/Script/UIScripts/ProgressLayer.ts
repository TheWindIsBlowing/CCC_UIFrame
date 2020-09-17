
import BaseUI from "./BaseUI";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import UIManager from "../Managers/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressLayer extends BaseUI {

    protected static className: string = "ProgressLayer";

    @property(cc.Node)
    failLayout: cc.Node = null;

    @property(cc.Node)
    progressLabel: cc.Node = null; // 加载进度值

    start(){
        let lm = ListenerManager.getInstance();
        lm.register(ListenerType.Game_Load_Failed, this, this.onLoadFailed);
        lm.register(ListenerType.Game_Load_Finish, this, this.onLoadFinish);
        lm.register(ListenerType.Game_Load_Progress, this, this.onLoadProgress);
    }

    onShow() {
        this.failLayout.active = false;
        this.progressLabel.active = true;
        this.progressLabel.getComponent(cc.Label).string = "0%";
    }

    private onLoadProgress(progress: number) {
        let proNum = Math.round(100 * progress);
        this.progressLabel.getComponent(cc.Label).string = "" + proNum + "%";
    }
    
    private onLoadFinish() {
        UIManager.getInstance().hideUI(ProgressLayer);
    }

    private onLoadFailed() {
        this.failLayout.active = true;
    }

    homeBtnOnClick() {
        ListenerManager.getInstance().trigger(ListenerType.Back_To_Main);
        this.progressLabel.active = false;
        this.progressLabel.getComponent(cc.Label).string = "0%";
        UIManager.getInstance().hideUI(ProgressLayer);
    }

    reloadBtnOnClick() {
        this.failLayout.active = false;
        ListenerManager.getInstance().trigger(ListenerType.Game_Reload);
    }

    onDisable() {
        this.progressLabel.getComponent(cc.Label).string = "0%";
    }
}
