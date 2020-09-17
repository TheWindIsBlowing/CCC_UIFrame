import BaseUI from "./BaseUI";
import HashMap from "../Utils/HashMap";
import UIManager from "../Managers/UIManager";
import TurntableConfig from "../Configs/TurntableConfig";
import GameDataManager from "../Managers/GameDataManager";
import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";
import SoundManager from "../Managers/SoundManager";
import ConstPath from "../GameData/ConstPath";
import Platforms from "../Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnTableLayer extends BaseUI {
    protected static className = "TurnTableLayer";
    private itemInfo: HashMap<number, any>;

    @property(cc.Node)
    zhuanpanNode: cc.Node = null;

    @property(cc.Node)
    receiveBtn: cc.Node = null;
    @property(cc.Node)
    rotateAd1: cc.Node = null;
    @property(cc.Node)
    rotateAd2: cc.Node = null;

    @property([cc.SpriteFrame])
    rewardSprArr: cc.SpriteFrame[] = []; // 奖励图集

    @property(cc.Node)
    energyBtn: cc.Node = null; // 获取体力值按钮
    @property(cc.Node)
    goldBtn: cc.Node = null; // 获取金币按钮

    private isNeedWatchAd: boolean = false; // 是否需要看视频转动转盘

    onLoad() {
        this.itemInfo = new HashMap();
        for (let i = 1; i <= TurntableConfig.filed_data.total_count; ++i) {
            let node = this.zhuanpanNode.getChildByName("award" + i);
            node.getChildByName("label").getComponent(cc.Label).string = (TurntableConfig.get_record(i).number).toString();

            let goodsType = TurntableConfig.get_record(i).type;
            if(goodsType == "gold") {
                node.getComponent(cc.Sprite).spriteFrame = this.rewardSprArr[(i + 1) / 2];
            }
            else if(goodsType == "energy") {
                node.getComponent(cc.Sprite).spriteFrame = this.rewardSprArr[0];
            }

            //this.itemInfo.set(i, node.getChildByName("label").getComponent(cc.Label));
        }
    }

    running = false;
    index = 0;
    audioId = null;

    pointBtnOnClick() {
        if (this.running)
            return;
        if(this.isNeedWatchAd) {
            Platforms.getInstance().showVideo("TurnTableLayerPointClick", 0, () => {
                this.rotateFunc();
            }, () => {
    
            });
        }
        else {
            let gameData = GameDataManager.getInstance().getGameData();
            gameData.openTurntable++;
            this.refresh();
            this.rotateFunc();
        }
    }

    private rotateFunc() {
        let gameManager = GameDataManager.getInstance();
        let data = gameManager.getGameData();
        // 转动次数加1
        data.rotateTableCount++;
        this.running = true;
        let rand = Math.random();
        this.index = -1;
        if (rand < TurntableConfig.getRandFunc(1)) {
            this.index = 0;
        } else if (rand < TurntableConfig.getRandFunc(2)) {
            this.index = 1;
        } else if (rand < TurntableConfig.getRandFunc(3)) {
            this.index = 2;
        } else if (rand < TurntableConfig.getRandFunc(4)) {
            this.index = 3;
        } else if (rand < TurntableConfig.getRandFunc(5)) {
            this.index = 4;
        } else if (rand < TurntableConfig.getRandFunc(6)) {
            this.index = 5;
        } else if(rand < TurntableConfig.getRandFunc(7)) {
            this.index = 6;
        } else if(rand < TurntableConfig.getRandFunc(8)) {
            this.index = 7;
        }

        // 前3次特殊处理
        if(data.rotateTableCount == 1) {
            this.index = 0;
        }
        else if(data.rotateTableCount == 2) {
            this.index = 3;
        }
        else if(data.rotateTableCount == 3) {
            this.index = 4;
        }

        let single = 360 / TurntableConfig.filed_data.total_count;
        
        let targetRotation = -(single * (this.index + 0.5) + 360 * 10);
        let rewardInf = TurntableConfig.get_record(this.index + 1);
        let count = rewardInf.number;
        let rewardType = rewardInf.type;

        console.log("index: ", this.index, "  count: ", count, "  rewardType: ", rewardType);
        if(rewardType == "gold") {
            data.lastGoldNum = data.goldNum;
            data.goldNum += count;
        }
        else if(rewardType == "energy") {
            data.lastEnergy = data.energy;
            data.energy += count;
        }
        
        gameManager.saveGameData();
        cc.tween(this.zhuanpanNode).to(5, { angle: targetRotation }, { easing: 'sineInOut' }).call(() => {
            this.zhuanpanNode.angle %= 360;
            this.running = false;
            if(rewardType == "gold") {
                //UIManager.getInstance().showUI(RewardLayer, this.node.zIndex + 1, null, true, count);
            }
            else if(rewardType == "energy") {
                //UIManager.getInstance().showUI(RewardLayer, this.node.zIndex + 1, null, true, count, false, true);
            }
        }).start();
        cc.audioEngine.stop(this.audioId);
        SoundManager.getInstance().play(ConstPath.SOUND_TURNTABLE, false, (audioId: number) => {
            this.audioId = audioId;
        });
    }

    private refresh() {
        let gameData = GameDataManager.getInstance().getGameData();
        this.isNeedWatchAd = false;
        this.rotateAd1.active = false;
        this.rotateAd2.active = false;
        console.log("openTurntable: ", gameData.openTurntable);
        if(gameData.openTurntable > 0) {
            this.isNeedWatchAd = true;
            this.rotateAd1.active = true;
            this.rotateAd2.active = true;
        }
    }

    onEnable() {
        this.refresh();
        let lm = ListenerManager.getInstance();
        lm.register(ListenerType.Main_Resume, this, this.onMainResume);

        Platforms.getInstance().showBanner();
        if(Platforms.getInstance().isVivo()) {
            Platforms.getInstance().showNativeAd();
        }
    }

    private onMainResume() {
        // this.blurBg.clear();
    }

    onDisable() {
        cc.Tween.stopAllByTarget(this.zhuanpanNode);
        this.zhuanpanNode.angle = 0;
        this.running = false;
        cc.audioEngine.stop(this.audioId);
        ListenerManager.getInstance().removeAll(this);
    }

    closeBtnOnClick() {
        if (this.running) {//还没转完就关掉
            //UIManager.getInstance().showUI(RewardLayer, this.node.zIndex + 1, null, true, TurntableConfig.get_record(this.index + 1).number);
        } else {
            ListenerManager.getInstance().trigger(ListenerType.Main_Resume);
        }
        UIManager.getInstance().hideUI(TurnTableLayer, true);
    }

}
