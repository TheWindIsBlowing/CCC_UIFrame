import BaseUI from "./BaseUI";
import Platforms from "../Platforms/Platforms";
import UIManager from "../Managers/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeLayer extends BaseUI {
    protected static className = "NativeLayer";
    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Label)
    adDescLabel: cc.Label = null;
    @property(cc.Sprite)
    pictureIcon: cc.Sprite = null;
    @property(cc.Node)
    closeBtn: cc.Node = null;

    private adId: number = 0;
    /**获取的广告地址 */
    private imageUrl: string = "";

    private adTemp: any = null;

    onShow(..._argArray: any[]) {
        if (_argArray[0]) {
            this.adTemp = _argArray[0];
        } else {
            this.adTemp = null;
        }
        this.adId = this.adTemp.adId;
        this.imageUrl = this.adTemp.imgUrlList[0];
        this.titleLabel.string = this.adTemp.title;
        this.adDescLabel.string = this.adTemp.desc;
        cc.loader.load(this.imageUrl, (err: any, imageAsset: cc.Texture2D) => {
            this.pictureIcon.spriteFrame = new cc.SpriteFrame(imageAsset);
            this.pictureIcon.node.setContentSize(600, 400);
        });
    }

    onEnable() {
        
    }

    onSureBtnClick() {
        Platforms.getInstance().onNativeAdClick(this.adId.toString());
    }
    onCloseBtnClick() {
        UIManager.getInstance().hideUI(NativeLayer, false);
        let theTime2 = new Date().getTime() / 1000;
        Platforms.getInstance().lastTimeRecord = theTime2;
    }
}
