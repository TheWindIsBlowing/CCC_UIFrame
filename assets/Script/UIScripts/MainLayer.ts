import BaseUI from "./BaseUI";
import UIManager from "../Managers/UIManager";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import GameDataManager from "../Managers/GameDataManager";
import SignLayer from "./SignLayer";
import TurnTableLayer from "./TurnTableLayer";
import SoundManager from "../Managers/SoundManager";
import Platforms from "../Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLayer extends BaseUI {
    protected static className = "MainLayer";

    @property(cc.Sprite)
    sound: cc.Sprite = null;

    @property([cc.SpriteFrame])
    soundFrames: cc.SpriteFrame[] = [null];

    @property(cc.Node)
    roomBtn: cc.Node = null;

    @property(cc.Node)
    newFurnitureIcon: cc.Node = null;

    @property(cc.Node)
    guide2Room: cc.Node = null;

    @property(cc.Label)
    countdown: cc.Label = null;

    @property(cc.Node)
    energyBtn: cc.Node = null; // 获取体力值按钮
    @property(cc.Node)
    goldBtn: cc.Node = null; // 获取金币按钮

    @property(cc.Node)
    fingerHint: cc.Node = null; // 提示点击开始游戏手指

    @property(cc.Node)
    specialBtn: cc.Node = null; // 剧情关卡按钮
    @property(cc.Node)
    light1: cc.Node = null; // 流光1
    @property(cc.Node)
    light2: cc.Node = null; // 流光2

    @property(cc.Node)
    moreGameBtn: cc.Node = null; // 更多游戏按钮

    @property(cc.Node)
    addDeskTopBtn: cc.Node = null; // 添加到桌面按钮

    @property(cc.Node)
    nativeIcon: cc.Node = null; // 原生icon节点

    @property(cc.Node)
    watchAdNode: cc.Node = null;

    countdownHandler = 0;

    onLoad() {
        let lm = ListenerManager.getInstance();
        let gm = GameDataManager.getInstance();
        let gameData = gm.getGameData();

        lm.register(ListenerType.Main_Resume, this, this.onMainResume);
        lm.register(ListenerType.Get_New_Furniture, this, this.onNewFurniture);
        lm.register(ListenerType.RefreshMainLayer, this, this.refreshFunc);

        // 检测未签到弹出签到弹窗
        if (gameData.isSign) {
            UIManager.getInstance().showUI(SignLayer, 2030, null, true);
        }
    }

    private refreshFunc() {
        if(GameDataManager.getInstance().getGameData().energy < 3) {
            this.watchAdNode.active = true;
        }
        else {
            this.watchAdNode.active = false;
        }
    }

    private onNewFurniture(isNew: boolean) {
        this.newFurnitureIcon.active = isNew;
    }

    private onMainResume() {
        // this.blurBg.clear();
    }

    onEnable() {
        this.refresh();
        this.onMainResume();
        cc.audioEngine.setMusicVolume(1);
    }

    private refresh() {
        let gameData = GameDataManager.getInstance().getGameData();
        if (gameData.isPlaySound) {
            this.sound.spriteFrame = this.soundFrames[0];
            SoundManager.getInstance().playBgmMain();
        }
        else {
            this.sound.spriteFrame = this.soundFrames[1];
            cc.audioEngine.stopAll();
        }
    }
    soundBtnOnClick() {
        GameDataManager.getInstance().changeIsPlaySound();
        this.refresh();
    }
    
    /**更多游戏 */
    moreGameFunc() {
        Platforms.getInstance().showMoreGamesBtn();
    }
    /**设置按钮 */
    setingBtnOnClick() {
        cc.log("setingBtnOnClick 设置按钮");
    }
    /**分享按钮 */
    shareBtnOnClick() {
        // TipUtils.showTip("=======================");
        cc.log("shareBtnOnClick 分享按钮");
    }
    /**添加桌面图标按钮 */
    desktopBtnOnClick() {
        cc.log("desktopBtnOnClick 添加桌面图标按钮");
    }
    /**转盘按钮 */
    turntableBtnOnClick() {
        cc.log("turntableBtnOnClick 转盘按钮");
        UIManager.getInstance().showUI(TurnTableLayer, 2030, null, true);
    }
    /**关卡按钮 */
    levelBtnOnClick() {
        cc.log("levelBtnOnClick 关卡列表按钮");
        
    }
    /**签到按钮 */
    signBtnOnClick() {
        cc.log("signBtnOnClick 签到按钮");
        UIManager.getInstance().showUI(SignLayer, 2030, null, true);
    }

    /**开始游戏按钮 */
    startBtnOnClick() {
        
    }
}
