import BaseUI from "./BaseUI";
import UIManager from "../Managers/UIManager";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import GameDataManager from "../Managers/GameDataManager";
import Platforms from "../Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseLayer extends BaseUI {

    protected static className = "PauseLayer";
    @property(cc.Sprite)
    sound: cc.Sprite = null;

    @property([cc.SpriteFrame])
    soundFrames: cc.SpriteFrame[] = [null];

    onEnable() {
        this.refresh();
        
        Platforms.getInstance().showBanner();
    }

    private refresh() {
        let gameData = GameDataManager.getInstance().getGameData();
        if (gameData.isPlaySound) {
            this.sound.spriteFrame = this.soundFrames[0];
            ListenerManager.getInstance().trigger(ListenerType.Sound_On);
        }
        else {
            this.sound.spriteFrame = this.soundFrames[1];
            cc.audioEngine.stopAll();
        }
    }

    closeBtnOnClick() {
        ListenerManager.getInstance().trigger(ListenerType.Game_Resume);
        UIManager.getInstance().hideUI(PauseLayer);

        if(Platforms.getInstance().isToutiao()) {
            Platforms.getInstance().hideBanner();
        }
    }
    recoverGameBtnOnClick() {
        ListenerManager.getInstance().trigger(ListenerType.Game_Resume);
        UIManager.getInstance().hideUI(PauseLayer);
    }
    soundBtnOnClick() {
        GameDataManager.getInstance().changeIsPlaySound();
        this.refresh();
    }
    toMainBtnOnClick() {
        ListenerManager.getInstance().trigger(ListenerType.Back_To_Main);
        UIManager.getInstance().hideUI(PauseLayer);
    }
}
