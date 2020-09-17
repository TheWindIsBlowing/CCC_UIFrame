import BaseUI from "./BaseUI";
import HashMap from "../Utils/HashMap";
import SignConfig from "../Configs/SignConfig";
import UIManager from "../Managers/UIManager";
import GameDataManager from "../Managers/GameDataManager";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import Platforms from "../Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignLayer extends BaseUI {
    protected static className = "SignLayer";
    private dayInfo: HashMap<number, any>;

    @property(cc.Node)
    continueBtn: cc.Node = null;

    @property(cc.Node)
    doubleBtn: cc.Node = null;

    @property(cc.Node)
    hasSign: cc.Node = null;

    @property(cc.Node)
    notSign: cc.Node = null;

    @property(cc.Node)
    autoChoose: cc.Node = null; // 默认勾选选框

    @property(cc.Node)
    hook: cc.Node = null; // 勾

    isFirstInSign: boolean = true; // 是否第一次进入次界面

    onLoad() {
        cc.log("SignLayer===============>:onLoad");
        this.hook.parent.on(cc.Node.EventType.TOUCH_END, this.clickHookFunc, this);

        // 坑人模式
        if(!(Platforms.getInstance().isOppo() || Platforms.getInstance().isVivo())) {
            this.doubleBtn.getChildByName("shipin").active = false;
            this.doubleBtn.getChildByName("doubleSpr").active = false;
        }
    }

    private clickHookFunc() {
        this.hook.active = !this.hook.active;
        
        // this.doubleBtn.getChildByName("shipin").active = this.hook.active;
        // this.doubleBtn.getChildByName("doubleSpr").active = this.hook.active;
    }

    onEnable() {
        if(Platforms.getInstance().isOppo() || Platforms.getInstance().isVivo()) {
            this.continueBtn.active = true;
            this.doubleBtn.getChildByName("label").getComponent(cc.Label).string = "双倍签到";
            this.doubleBtn.setPosition(118, -380);
            this.autoChoose.active = false;
            this.hook.active = true;
        }
        // 坑人模式
        else {
            // this.continueBtn.active = false;
            // this.scheduleOnce(() => {
            //     this.continueBtn.active = true;
            //     this.continueBtn.opacity = 0;
            //     cc.tween(this.continueBtn).to(0.1, { opacity: 255 }, { easing: 'sineInOut' }).start();
            // }, 1);

            this.continueBtn.active = false;
            this.doubleBtn.active = true;
            this.doubleBtn.getChildByName("label").getComponent(cc.Label).string = "签 到";
            this.doubleBtn.setPosition(0, -360);
            this.autoChoose.active = true;
            this.hook.active = true;
            // this.doubleBtn.getChildByName("shipin").active = true;
            // this.doubleBtn.getChildByName("doubleSpr").active = true;
        }
        
        this.refresh();
        let gameManager = GameDataManager.getInstance();
        let currDay = gameManager.getCurrentDay();
        if (currDay != gameManager.getGameData().openSign) {
            gameManager.getGameData().openSign = currDay;
            gameManager.saveGameData();
        }

        Platforms.getInstance().showBanner();
        let gameData = GameDataManager.getInstance().getGameData();
        // if(Platforms.getInstance().isVivo() && !gameData.isFirstInGame) {
        //     Platforms.getInstance().showNativeAd();
        // }
        if(Platforms.getInstance().isVivo() && !this.isFirstInSign) {
            Platforms.getInstance().showNativeAd();
        }
        this.isFirstInSign = false;
        
        GameDataManager.getInstance().saveGameData();
    }

    onDisable() {
        this.unscheduleAllCallbacks();
        cc.tween(this.continueBtn).stop();
    }

    signDay = 1;

    private refresh() {
        let gameData = GameDataManager.getInstance().getGameData();
        this.hasSign.active = false;
        this.notSign.active = false;
        if (gameData.isSign) {
            this.notSign.active = true;
        } else {
            this.hasSign.active = true;
            this.autoChoose.active = false;
        }
        this.dayInfo = new HashMap();
        let effectNode: cc.Node = this.node.getChildByName("effectNode");
        let checkCurr = false;
        for (let i = 1; i <= 7; ++i) {
            let node = effectNode.getChildByName("day" + i);
            node.getChildByName("awardLabel").getComponent(cc.Label).string = "金币" + (SignConfig.get_record(i).number).toString();
            this.dayInfo.set(i, node.getChildByName("awardLabel").getComponent(cc.Label));
            let gou = node.getChildByName("gou");
            if (gameData.sign["day" + i]) {//已经签到过了
                gou.active = true;
            } else {//还没签到的
                gou.active = false;
                if (gameData.isSign && !checkCurr) {//今天还没签到
                    checkCurr = true;
                    this.signDay = i;
                }
            }
        }
    }

    start() {

    }

    closeBtnOnClick() {
        ListenerManager.getInstance().trigger(ListenerType.Main_Resume);
        UIManager.getInstance().hideUI(SignLayer, true);
    }
    day1BtnOnClick() {
        cc.log("===============>day1BtnOnClick");
        this.sign(1);
    }
    day2BtnOnClick() {
        cc.log("===============>day2BtnOnClick");
        this.sign(2);
    }
    day3BtnOnClick() {
        cc.log("===============>day3BtnOnClick");
        this.sign(3);
    }
    day4BtnOnClick() {
        cc.log("===============>day4BtnOnClick");
        this.sign(4);
    }
    day5BtnOnClick() {
        cc.log("===============>day5BtnOnClick");
        this.sign(5);
    }
    day6BtnOnClick() {
        cc.log("===============>day6BtnOnClick");
        this.sign(6);
    }
    day7BtnOnClick() {
        cc.log("===============>day7BtnOnClick");
        this.sign(7);
    }

    sign(day: number, isDouble: boolean = false) {
        let gameData = GameDataManager.getInstance().getGameData();
        if (gameData.isSign && this.signDay == day) {
            GameDataManager.getInstance().changeSign("day" + day);
            UIManager.getInstance().hideUI(SignLayer);
            let count = SignConfig.get_record(day).number * (isDouble ? 2 : 1);
            let gm = GameDataManager.getInstance();
            let data = gm.getGameData();
            data.lastGoldNum = data.goldNum;
            data.goldNum += count;
            gm.saveGameData();

            ListenerManager.getInstance().trigger(ListenerType.Hide_SignBtn_Hongdian);
        }
    }

    doubleBtnOnClick() {
        if(this.hook.active) {
            Platforms.getInstance().showVideo("SignLayerDoubleGold", 0, () => {
                this.sign(this.signDay, true);
                UIManager.getInstance().hideUI(SignLayer);
            }, () => {
    
            });
        }
        else {
            this.sign(this.signDay, false);
            UIManager.getInstance().hideUI(SignLayer);
        }
    }

    signBtnOnClick() {
        cc.log("===============>signBtnOnClick");
        this.sign(this.signDay, false);
        UIManager.getInstance().hideUI(SignLayer);
    }
}
