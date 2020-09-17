import PlatformsAPI from "../PlatformsAPI";
import GameIdConfig from "../GameIdConfig";
import { TipUtils } from "../../Utils/TipUtils";
import Platforms from "../Platforms";
import UIManager from "../../Managers/UIManager";
import NativeLayer from "../../UIScripts/NativeLayer";
import SoundManager from "../../Managers/SoundManager";

export default class vivoH5GameAPI implements PlatformsAPI {
    videoType: string = "";
    arg: any = null;
    /**平台环境 */
    qg: any = window["qg"];
    /**banner广告 */
    bannerAd: any = null;
    /**插屏广告 */
    interstitialAd: any = null;
    /**视频广告 */
    rewardedVideoAd: any = null;
    /**视频广告是否已经load到数据 */
    m_videoAdIsLoaded: boolean = false;

    /**原生 */
    nativeAd: any = null;
    /**原生load取值 */
    resTemp: any = null;

    /**原生icon */
    nativeIconAd: any = null;
    /**原生icon取值 */
    resTemp2: any = null;

    /**原生Icon */
    nativeIcon: any = null;
    /**原生Icon load取值 */
    resTempIcon: any = null;

    /**系统信息 */
    systemInfo: any = null;

    /**是否调试模式 */
    isDebug: boolean = false;
    playingVideo: boolean = false; // 是否正在播放视频
    lastTimeRecord: number = 0; // 上次成功播放原生插屏时间
    lastTimeRecord3: number = 0; // 上次成功播放banner时间
    isBannerShow: boolean = false; // banner广告是否显示

    onInit(_callback: Function) {
        console.log("vivoH5GameAPI onInit");
        if (this.qg !== null && this.qg !== undefined) {
            this.systemInfo = this.qg.getSystemInfoSync();
        }
        else {
            this.qg = null;
        }
        _callback && _callback();
        this.createVideo();
    }
    onLogin() {

    }
    onShare(_callback: Function) {
        console.log("vivoH5GameAPI onShare");
    }
    createBanner() {
        console.log("vivoH5GameAPI createBanner");
    }
    showBanner() {
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1031) {
                console.log("=================>版本过低不能创建banner");
                return;
            }
            if(this.isBannerShow) {
                console.log("is showing banner ad");
                return;
            }
            let theTime = new Date().getTime() / 1000;
            if (theTime - this.lastTimeRecord3 <= 15) {
                console.log((15 - (theTime - this.lastTimeRecord3)) + "秒后再试 拉取banner");
                return;
            }
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
            this.bannerAd = this.qg.createBannerAd({
                posId: GameIdConfig.vivoID["bannerAdId"],
                style: {}
            });
            this.bannerAd.show()
            .then(() => {
                console.log("show banner ad success");
                this.lastTimeRecord3 = new Date().getTime() / 1000;
                this.isBannerShow = true;
            })
            .catch((err) => {
                console.log("show banner ad fail", JSON.stringify(err));
            })

            let onLoadFunc = () => {
                console.log("load banner success");
                this.bannerAd.offLoad(onLoadFunc);
            }
            this.bannerAd.onLoad(onLoadFunc);

            let onCloseFunc = () => {
                console.log("hide banner success");
                this.isBannerShow = false;
                this.bannerAd.offClose(onCloseFunc);
            }
            this.bannerAd.onClose(onCloseFunc);

            let onErrorFunc = (err) => {
                console.log("load banner error", err);
                this.bannerAd.offError(onErrorFunc);
            }
            this.bannerAd.onError(onErrorFunc);
        }
        console.log("vivoH5GameAPI showBanner");
    }
    hideBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy()
            .then(() => {
                console.log("banner广告销毁成功");
                this.isBannerShow = false;
            }).catch(err => {
                console.log("banner广告销毁失败", err);
            });
            this.bannerAd = null;
        }
        console.log("vivoH5GameAPI hideBanner");
    }
    createVideo() {
        if (this.qg != null && this.qg != undefined) {
            if (this.qg.getSystemInfoSync().platformVersionCode < 1041) {
                console.log("=================>版本过低不能创建激励视频");
                return;
            }
            
            this.rewardedVideoAd = this.qg.createRewardedVideoAd({
                posId: GameIdConfig.vivoID["rewardedVideoAdId"]
            });
            
            this.rewardedVideoAd.onLoad(() => {
                console.log("onload激励视频广告加载成功");
                this.m_videoAdIsLoaded = true;
            });
            this.rewardedVideoAd.onError(err => {
                console.log("onload激励视频广告加载失败", err);
                this.m_videoAdIsLoaded = false;
            });
        }
        console.log("vivoH5GameAPI createVideo");
    }
    showVideo(_type: string, _arg: any, _successCallback?: Function, _failCallback?: Function) {
        if (this.isDebug) {
            console.log("调试模式，可以下发游戏奖励");
            _successCallback && _successCallback();
            TipUtils.showTip('视频观看完成，获得奖励');
            return;
        }

        this.videoType = _type;
        this.arg = _arg;
        if (this.rewardedVideoAd && this.m_videoAdIsLoaded) {
            this.rewardedVideoAd.show();
            cc.audioEngine.setMusicVolume(0);
            this.playingVideo = true;
            let onCloseFunc = (res) => {
                cc.audioEngine.setMusicVolume(1);
                this.playingVideo = false;
                if (res && res.isEnded) {
                    console.log("onClose正常播放结束，可以下发游戏奖励");
                    TipUtils.showTip("已成功获得奖励");
                    _successCallback && _successCallback();
                    this.rewardedVideoAd.load();
                } else {
                    console.log("onClose播放中途退出，不下发游戏奖励");
                    TipUtils.showTip("未完整观看视频，无法获得奖励");
                    _failCallback && _failCallback();
                    this.rewardedVideoAd.load();
                }
                this.rewardedVideoAd.offClose(onCloseFunc);
            }
            this.rewardedVideoAd.onClose(onCloseFunc);
        }
        else {
            /**没有成功创建广告或者没有成功load广告 就重新创建一个 */
            console.log("广告还未准备好,请稍后再试");
            TipUtils.showTip("视频还未准备好，请稍后再试...");
            if(this.rewardedVideoAd) {
                this.rewardedVideoAd.load();
            }
            else {
                this.createVideo();
            }
        }
        console.log("vivoH5GameAPI showVideo===videoType>:", this.videoType);
        console.log("vivoH5GameAPI showVideo===arg>:", this.arg);
    }
    showVideoAward() {
        this.videoType = "";
        this.arg = 0;
        console.log("vivoH5GameAPI showVideoAward");
    }
    showVideoFail() {
        this.videoType = "";
        this.arg = 0;
        console.log("vivoH5GameAPI showVideoFail");
    }
    createInsertAd() {
        console.log("vivoH5GameAPI createInsertAd");
    }
    showInsertAd() {
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1031) {
                console.log("=================>版本过低不能创建插屏");
                return;
            }
            let theTime = new Date().getTime() / 1000;
            this.lastTimeRecord = Platforms.getInstance().lastTimeRecord;
            if (theTime - this.lastTimeRecord <= 15) {
                console.log((15 - (theTime - this.lastTimeRecord)) + "秒后再试 拉取渠道插屏");
                return;
            }
            if (this.interstitialAd) {
                this.interstitialAd = null;
            }
            this.interstitialAd = this.qg.createInterstitialAd({
                posId: GameIdConfig.vivoID["InsertAdId"]
            });
            this.interstitialAd.onLoad(() => {
                console.log("插屏加载成功");
                this.interstitialAd.show();
            });
            let func = function () {
                let theTime2 = new Date().getTime() / 1000;
                Platforms.getInstance().lastTimeRecord = theTime2;
                this.interstitialAd.offClose(func);
                console.log("close interstitialad !!!");
            };
            this.interstitialAd.onClose(func);
        }
        console.log("vivoH5GameAPI showInsertAd");
    }
    createNativeAd() {
        console.log("vivoH5GameAPI createNativeAd");
    }
    showNativeAd() {
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1053) {
                console.log("=================>版本过低不能创建原生");
                return;
            }

            // 延迟一秒
            setTimeout(() => {
                let theTime = new Date().getTime() / 1000;
                this.lastTimeRecord = Platforms.getInstance().lastTimeRecord;
                if (theTime - this.lastTimeRecord <= 15) {
                    console.log((15 - (theTime - this.lastTimeRecord)) + "秒后再试 拉取原生插屏");
                    this.showInsertAd();
                    return;
                }
                if (this.nativeAd) {
                    this.nativeAd = null;
                }
                this.nativeAd = this.qg.createNativeAd({
                    posId: GameIdConfig.vivoID["NativeAdId"]
                });
                this.nativeAd.load();
                this.nativeAd.onLoad((res) => {
                    console.log('原生广告加载完成', JSON.stringify(res));
                    if (res && res.adList) {
                        this.resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", this.resTemp);
                        if (this.resTemp) {
                            UIManager.getInstance().showUI(NativeLayer, cc.macro.MAX_ZINDEX, null, false, this.resTemp);
                            this.nativeAd.reportAdShow({ adId: this.resTemp.adId.toString() });
                        } else {
                            this.showInsertAd();
                        }
                    }
                });
            }, 1 * 1000);
        }
        console.log("vivoH5GameAPI showNativeAd");
    }
    hideNativeAd() {

    }
    onNativeAdClick(_id: string, flag: number) {
        if (this.nativeAd) {
            this.nativeAd.reportAdClick({ adId: _id.toString() });
        }
        console.log("vivoH5GameAPI onNativeAdClick");
    }
    createNativeIconAd() {

    }
    showNativeIconAd(node: cc.Node, func: Function) {
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1051) {
                console.log("版本号过低 无法创建原生icon广告");
                return;
            }
            if (this.nativeIconAd) {
                this.nativeIconAd = null;
            }

            this.nativeIconAd = this.qg.createNativeAd({
                adUnitId: GameIdConfig.vivoID["NativeAdIconId"],
            });
            this.nativeIconAd.load();
            this.nativeIconAd.onLoad((res) => {
                console.log("原生广告icon 下载成功 展示原生icon广告");
                console.log(res);
                if (res && res.adList) {
                    this.resTemp2 = res.adList.pop();
                    console.log("=============================>resTemp2:", this.resTemp2);
                    if (this.resTemp2) {
                        func && func(this.resTemp2);
                        this.nativeIconAd.reportAdShow({
                            adId: this.resTemp2.adId
                        });
                    }
                }
            });
        }
        console.log("oppoH5GameAPI showNativeAd icon");
    }
    onNativeIconAdClick(_id: string) {
        if (this.nativeIconAd) {
            this.nativeIconAd.reportAdClick({
                adId: _id
            });
        }
    }
    saveDataToCache(_key: string, _value: any) {
        console.log("vivoH5GameAPI saveDataToCache");
    }
    readDataFromCache(_key: string) {
        console.log("vivoH5GameAPI readDataFromCache");
    }
    /**添加icon到桌面 */
    addDesktop(_callback: Function) {
        if (this.isDebug) {
            console.log("调试模式，添加桌面成功");
            _callback(1);
            return;
        }
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1044) {
                console.log("版本号过低 无法创建桌面图标");
                return;
            }
            let func1 = (res) => {
                _callback && _callback(res);
            };
            this.qg.installShortcut({
                success: (res) => {
                    console.log("installShortcut");
                    setTimeout(() => {
                        this.qg.hasShortcutInstalled({
                            success: (status) => {
                                console.log("status : ", status);
                                if (status) {
                                    func1(1);
                                } else {
                                    func1(0);
                                }
                            }
                        });
                    }, 0.5 * 1000);
                },
                fail: (err) => {
                    console.log("创建失败", err);
                    _callback && _callback(0);
                },
                complete: () => {

                }
            })
        }
    }
    // 检测是否添加桌面图标
    haveAddDesktop(_callback: Function) {
        if (this.qg != null && this.qg != undefined) {
            this.qg.hasShortcutInstalled({
                success: function (status) {
                    if (status) {
                        console.log('---------------------------------已创建');
                        _callback && _callback(1);
                    } else {
                        console.log('---------------------------------未创建');
                        _callback && _callback(0);
                    }
                }
            });
        }
        console.log("oppoH5GameAPI isHaveAddDesktop");
    }

    onShareVideo(_callback: Function) {

    }
    startRecordScreen() {

    }
    stopRecordScreen() {

    }
    createMoreGamesBtn() {

    }
    showMoreGamesBtn() {

    }
}