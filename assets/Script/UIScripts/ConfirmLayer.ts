import BaseUI from "./BaseUI";
import UIManager from "../Managers/UIManager";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import GameDataManager from "../Managers/GameDataManager";
import CoinFly from "../Utils/CoinFly";
import Platforms from "../Platforms/Platforms";
import SuccessLayer from "./SuccessLayer";
import FailLayer from "./FailLayer";
import { TipUtils } from "../Utils/TipUtils";
import CoinFlyLayer from "./CoinFlyLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfirmLayer extends BaseUI {

    protected static className = "ConfirmLayer";

    @property(cc.Node)
    sureBtn: cc.Node = null;

    @property(cc.Node)
    cancelBtn: cc.Node = null;

    _successFunc: Function;
    _failFunc: Function;

    onLoad() {
        this.sureBtn.on(cc.Node.EventType.TOUCH_END, this.sureFunc, this);
        this.cancelBtn.on(cc.Node.EventType.TOUCH_END, this.cancelFunc, this);
    }

    public onShow(..._argArray: any[]) {
        super.onShow();

        this._successFunc = _argArray[0];
        this._failFunc = _argArray[1];
    }

    onEnable() {
        
    }

    private sureFunc() {
        Platforms.getInstance().showVideo("ConfirmLayerVideo", 0, this._successFunc, this._failFunc);
    }

    private cancelFunc() {
        UIManager.getInstance().hideUI(ConfirmLayer, false);
    }

}
