import baiduH5GameAPI from "./baiduH5GameAPI/baiduH5GameAPI";
import oppoH5GameAPI from "./oppoH5GameAPI/oppoH5GameAPI";
import qqplayH5GameAPI from "./qqplayH5GameAPI/qqplayH5GameAPI";
import toutiaoH5GameAPI from "./toutiaoH5GameAPI/toutiaoH5GameAPI";
import vivoH5GameAPI from "./vivoH5GameAPI/vivoH5GameAPI";
import weixinH5GameAPI from "./weixinH5GameAPI/weixinH5GameAPI";
import x4399H5GameAPI from "./x4399H5GameAPI/x4399H5GameAPI";
import xiaomiH5GameAPI from "./xiaomiH5GameAPI/xiaomiH5GameAPI";
import PlatformsAPI from "./PlatformsAPI";

export enum Platform {
    baidu_H5 = 1,
    oppo_H5,
    qqplay_H5,
    toutiao_H5,
    vivo_H5,
    weixin_H5,
    x4399_H5,
    xiaomi_H5
}
export default class Platforms {
    private static mInstance: Platforms = null;
    private platformAPI: PlatformsAPI = null;
    private platform: Platform = Platform.toutiao_H5;

    // 记录 成功结算次数
    public settlementSuccessCount: number = 0;
    // 记录 失败结算次数
    public settlementFailCount: number = 0;

    // 本次结算是否分享成功
    public isShareVideoSuccess: boolean = false;

    // vivo平台记录上次关闭插屏时间
    public lastTimeRecord: number = 0;

    public static getInstance(): Platforms {
        if (this.mInstance === null) {
            this.mInstance = new Platforms();
        }
        return this.mInstance;
    }
    private constructor() {

    }

    public setPlatform(platform: Platform) {
        this.platform = platform;
    }
    public onInit(_callback: Function) {
        switch (this.platform) {
            case Platform.baidu_H5:
                this.platformAPI = new baiduH5GameAPI();
                break;
            case Platform.oppo_H5:
                this.platformAPI = new oppoH5GameAPI();
                break;
            case Platform.qqplay_H5:
                this.platformAPI = new qqplayH5GameAPI();
                break;
            case Platform.toutiao_H5:
                this.platformAPI = new toutiaoH5GameAPI();
                break;
            case Platform.vivo_H5:
                this.platformAPI = new vivoH5GameAPI();
                break;
            case Platform.weixin_H5:
                this.platformAPI = new weixinH5GameAPI();
                break;
            case Platform.x4399_H5:
                this.platformAPI = new x4399H5GameAPI();
                break;
            case Platform.xiaomi_H5:
                this.platformAPI = new xiaomiH5GameAPI();
                break;
        }
        if (this.platformAPI && this.platformAPI !== null) {
            console.log("current platform: ", this.platform);
            this.platformAPI.onInit(_callback);
        }
    }
    public onLogin() {
        this.platformAPI && this.platformAPI.onLogin();
    }
    public onShare(_callback: Function) {
        this.platformAPI && this.platformAPI.onShare(_callback);
    }
    public createBanner() {
        this.platformAPI && this.platformAPI.createBanner();
    }
    public showBanner() {
        this.platformAPI && this.platformAPI.showBanner();
    }
    public hideBanner() {
        this.platformAPI && this.platformAPI.hideBanner();
    }
    public createVideo() {
        this.platformAPI && this.platformAPI.createVideo();
    }
    public showVideo(_type: string, _arg: any, _successCallback?: Function, _failCallback?: Function) {
        this.platformAPI && this.platformAPI.showVideo(_type, _arg, () => {
            _successCallback && _successCallback();
        }, () => {
            _failCallback && _failCallback();
        });
    }
    public showVideoAward() {
        this.platformAPI && this.platformAPI.showVideoAward();
    }
    public showVideoFail() {
        this.platformAPI && this.platformAPI.showVideoFail();
    }
    public createInsertAd() {
        this.platformAPI && this.platformAPI.createInsertAd();
    }
    public showInsertAd() {
        this.platformAPI && this.platformAPI.showInsertAd();
    }
    public createNativeAd() {
        this.platformAPI && this.platformAPI.createNativeAd();
    }
    public showNativeAd(node: cc.Node = null, func: Function = null, id: string = null) {
        this.platformAPI && this.platformAPI.showNativeAd(node, func, id);
    }
    public onNativeAdClick(_id: string, flag: number = 0) {
        this.platformAPI && this.platformAPI.onNativeAdClick(_id, flag);
    }
    public hideNativeAd(node: cc.Node = null, func: Function = null) {
        this.platformAPI && this.platformAPI.hideNativeAd(node, func);
    }
    public createNativeIconAd() {
        this.platformAPI && this.platformAPI.createNativeIconAd();
    }
    public showNativeIconAd(node: cc.Node, func: Function, id: string) {
        this.platformAPI && this.platformAPI.showNativeIconAd(node, func, id);
    }
    public onNativeIconAdClick(_id: string, flag: number) {
        this.platformAPI && this.platformAPI.onNativeIconAdClick(_id, flag);
    }
    public saveDataToCache(_key: string, _value: any) {
        this.platformAPI && this.platformAPI.saveDataToCache(_key, _value);
    }
    public readDataFromCache(_key: string) {
        this.platformAPI && this.platformAPI.readDataFromCache(_key);
    }
    public addDesktop(_callback: Function) {
        this.platformAPI && this.platformAPI.addDesktop(_callback);
    }
    public haveAddDesktop(_callback: Function) {
        this.platformAPI && this.platformAPI.haveAddDesktop(_callback);
    }
    public onShareVideo(_callback: Function) {
        this.platformAPI && this.platformAPI.onShareVideo(_callback);
    }
    public startRecordScreen() {
        this.platformAPI && this.platformAPI.startRecordScreen();
    }
    public stopRecordScreen() {
        this.platformAPI && this.platformAPI.stopRecordScreen();
    }
    public createMoreGamesBtn() {
        this.platformAPI && this.platformAPI.createMoreGamesBtn();
    }
    public showMoreGamesBtn() {
        this.platformAPI && this.platformAPI.showMoreGamesBtn();
    }

    /**区分渠道 示例*/
    public isOppo() {
        let arr = [Platform.oppo_H5];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === this.platform) {
                return true;
            }
        }
        return false;
    }
    public isVivo() {
        let arr = [Platform.vivo_H5];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === this.platform) {
                return true;
            }
        }
        return false;
    }
    public isToutiao() {
        let arr = [Platform.toutiao_H5];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === this.platform) {
                return true;
            }
        }
        return false;
    }
    public isQQplay() {
        let arr = [Platform.qqplay_H5];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === this.platform) {
                return true;
            }
        }
        return false;
    }

    // 头条数据统计
    public sendMessageFunc(name: string, value: number = null) {
        console.log("sendMessage : ", name, value);
        if(cc.sys.isBrowser) {
            return;
        }

        if(window["tt"]) {
            if(value) {
                window["tt"].reportAnalytics(name, {
                    level: value,
                });
            }
            else {
                window["tt"].reportAnalytics(name, {
                    
                });
            }
        }
    }

}