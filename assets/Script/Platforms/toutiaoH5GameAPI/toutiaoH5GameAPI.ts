import PlatformsAPI from "../PlatformsAPI";
import { TipUtils } from "../../Utils/TipUtils";
import UIManager from "../../Managers/UIManager";
import ConfirmLayer from "../../UIScripts/ConfirmLayer";
import GameIdConfig from "../GameIdConfig";
import Platforms from "../Platforms";

export default class toutiaoH5GameAPI implements PlatformsAPI {
    videoType: string = "";
    arg: any = null;
    tt: any = window["tt"];
    windowWidth: number = 0;
    windowHeight: number = 0;
    shareUrl: string = "https://www.zywxgames.com/Resource/liufenghong/daomeixiansheng/share.jpg";

    /**banner广告 */
    bannerAd: any = null;
    /**视频广告 */
    rewardedVideoAd: any = null;
    /**视频广告是否已经load到数据 */
    m_videoAdIsLoaded: boolean = false;
    /**录屏 */
    recorder: any = null;
    /**记录录屏时间 */
    timeCount: number = 0;
    /**录屏video地址 */
    videoPath: any = null;
    /**录屏时间 */
    recordTime: number = 0;

    systemInfo: any = null;

    isDebug: boolean = false; // 是否调试中

    onInit(_callback: Function) {
        _callback && _callback();
        if (this.tt != null && this.tt != undefined) {
            let res = this.tt.getSystemInfoSync();
            if (res) {
                this.windowWidth = res.windowWidth;
                this.windowHeight = res.windowHeight;
                this.systemInfo = res;
            }
            this.tt.onShareAppMessage((res) => {
                console.log(res.channel);
                return {
                    title: "倒霉先生",
                    imageUrl: this.shareUrl,
                    success() {
                        console.log('分享成功');
                    },
                    fail(e) {
                        console.log('分享失败', e);
                    }
                }
            });
            this.recorder = this.tt.getGameRecorderManager();
            setInterval(() => {
                this.timeCount += 0.1;
            }, 100);
        }
        this.createVideo();
        console.log("toutiaoH5GameAPI onInit");
    }
    onLogin() {

    }
    onShare(_callback: Function) {
        if (this.tt != null && this.tt != undefined) {

            this.tt.shareAppMessage({
                channel: "article",
                templateId: "1cl01e20h30f6710le",
                title: "倒霉先生",
                imageUrl: this.shareUrl,
                success: () => {

                    console.log("======================> 分享成功");
                },
                fail: (res) => {

                    console.log("======================> 分享失败");
                }
            });
        }
        console.log("toutiaoH5GameAPI onShare");
    }
    createBanner() {
        console.log("toutiaoH5GameAPI createBanner");
    }
    showBanner() {
        if (this.tt != null && this.tt != undefined) {
            let targetBannerAdWidth = 128;
            if (this.systemInfo.appName == "Douyin") {
                return;
            }
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
            this.bannerAd = this.tt.createBannerAd({
                adUnitId: GameIdConfig.toutiaoID["bannerAdId"],
                adIntervals: 30,
                style: {
                    width: targetBannerAdWidth,
                    top: this.windowHeight - (targetBannerAdWidth / 16 * 9), // 根据系统约定尺寸计算出广告高度
                }
            });
            this.bannerAd.style.left = (this.windowWidth - targetBannerAdWidth) / 2;

            this.bannerAd.onLoad(() => {
                this.bannerAd.show().then(() => {
                    console.log('show banner success');
                    console.log("banner width " + this.bannerAd.style.width);
                    console.log("banner height " + this.bannerAd.style.height);
                }).catch(err => {
                    console.log('show banner fail ' + err);
                });
            });

            let onResizeCallback = (size) => {
                console.log(size.width, size.height);
                // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
                if (targetBannerAdWidth != size.width) {
                    targetBannerAdWidth = size.width;
                    this.bannerAd.style.top = this.windowHeight - (size.width / 16 * 9);
                    this.bannerAd.style.left = (this.windowWidth - size.width) / 2;
                }
                this.bannerAd.style.top = this.windowHeight - size.height - 2;
                this.bannerAd.style.left = (this.windowWidth - size.width) / 2;
            }
            this.bannerAd.onResize(onResizeCallback);

        }
        console.log("toutiaoH5GameAPI showBanner");
    }
    hideBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
        console.log("toutiaoH5GameAPI hideBanner");
    }
    createVideo() {
        if (this.tt != null && this.tt != undefined) {
            if(!this.tt.createRewardedVideoAd) {
                return;
            }
            this.rewardedVideoAd = this.tt.createRewardedVideoAd({
                adUnitId: GameIdConfig.toutiaoID["rewardedVideoAdId"]
            });
            this.rewardedVideoAd.load().then(() => {
                console.log("onload激励视频广告加载成功");
                //this.m_videoAdIsLoaded = true;
            }).catch((err) => {
                console.log(err + "----------------");
                console.log("onload激励视频广告加载失败-->errMsg:", err.errMsg, "==>errCode:", err.errCode);
                //this.m_videoAdIsLoaded = false;
            });
        }
        console.log("toutiaoH5GameAPI createVideo");
    }
    showVideo(_type: string, _arg: any, _successCallback?: Function, _failCallback?: Function) {
        this.videoType = _type;
        this.arg = _arg;
        if (this.isDebug) {
            console.log("调试模式，可以下发游戏奖励");
            _successCallback && _successCallback();

            TipUtils.showTip('视频观看完成，获得奖励');

            return;
        }

        Platforms.getInstance().sendMessageFunc("requestRewardVideo");

        if (this.rewardedVideoAd/* && this.m_videoAdIsLoaded*/) {
            Platforms.getInstance().sendMessageFunc("showRewardVideo");
            TipUtils.showTip('观看完整视频可获得奖励哦');
            this.rewardedVideoAd.show()
            .then(() => {
                console.log("展示激励广告");
            })
            .catch(() => {
                this.rewardedVideoAd.load()
                .then(() => {
                    console.log("手动load一次");
                })
            });

            let onCloseFunc = (res) => {
                if (res && res.isEnded) {
                    console.log("onClose正常播放结束，可以下发游戏奖励");
                    _successCallback && _successCallback();
                    //this.rewardedVideoAd.load();
                    TipUtils.showTip('视频观看完成，获得奖励');
                    UIManager.getInstance().hideUI(ConfirmLayer);
                    Platforms.getInstance().sendMessageFunc("watchVideoSuccess");
                } else {
                    console.log("onClose播放中途退出，不下发游戏奖励");
                    _failCallback && _failCallback();
                    //this.rewardedVideoAd.load();
                    UIManager.getInstance().showUI(ConfirmLayer, cc.macro.MAX_ZINDEX, null, false, _successCallback, _failCallback);
                    Platforms.getInstance().sendMessageFunc("closeRewardVideo");
                }

                this.rewardedVideoAd.offClose(onCloseFunc);
            }
            this.rewardedVideoAd.onClose(onCloseFunc);
        } else {
            TipUtils.showTip('视频还未准备好，请稍后再试...');
            this.createVideo();
            Platforms.getInstance().sendMessageFunc("requestRewardVideoFail");
        }
        console.log("toutiaoH5GameAPI showVideo===videoType>:", this.videoType);
        console.log("toutiaoH5GameAPI showVideo===arg>:", this.arg);
    }
    showVideoAward() {
        this.videoType = "";
        this.arg = 0;
        console.log("toutiaoH5GameAPI showVideoAward");
    }
    showVideoFail() {
        this.videoType = "";
        this.arg = 0;
        console.log("toutiaoH5GameAPI showVideoFail");
    }
    createInsertAd() {
        console.log("toutiaoH5GameAPI createInsertAd");
    }
    showInsertAd() {
        console.log("toutiaoH5GameAPI showInsertAd");
    }
    createNativeAd() {
        console.log("toutiaoH5GameAPI createNativeAd");
    }
    showNativeAd() {
        console.log("toutiaoH5GameAPI showNativeAd");
    }
    onNativeAdClick(_id: string) {
        console.log("toutiaoH5GameAPI onNativeAdClick");
    }
    createNativeIconAd() {

    }
    showNativeIconAd() {

    }
    onNativeIconAdClick(_id: string) {

    }
    /**隐藏原生广告 */
    hideNativeAd(node: cc.Node = null, func: Function = null) {

    }
    saveDataToCache(_key: string, _value: any) {
        console.log("toutiaoH5GameAPI saveDataToCache");
    }
    readDataFromCache(_key: string) {
        console.log("toutiaoH5GameAPI readDataFromCache");
    }
    addDesktop(_callback: Function) {
        console.log("toutiaoH5GameAPI addDesktop");
    }
    // 检测是否添加桌面图标
    haveAddDesktop(_callback: Function) {
        console.log("oppoH5GameAPI isHaveAddDesktop");
    }
    onShareVideo(_callback: Function) {
        if (this.isDebug) {
            console.log("调试模式，分享成功下发游戏奖励");
            _callback && _callback(1);
            return;
        }
        Platforms.getInstance().sendMessageFunc("wantShareVideo");
        if (this.tt != null && this.tt != undefined) {
            if (this.recordTime < 3) {
                return;
            }
            Platforms.getInstance().sendMessageFunc("pullUpShareVideo");
            this.tt.shareAppMessage({
                channel: "video",
                title: "倒霉先生",
                extra: {
                    videoPath: this.videoPath, // 可用录屏得到的视频地址
                    videoTopics: ['跟我一起来玩玩吧']
                },
                success() {
                    console.log('分享视频成功');
                    _callback && _callback(1);
                    Platforms.getInstance().sendMessageFunc("allShareVideoSuccess");
                },
                fail(e) {
                    console.log('分享视频失败', e);
                    _callback && _callback(0);
                    Platforms.getInstance().sendMessageFunc("allShareVideoFail");
                }
            })
        }
        console.log("toutiaoH5GameAPI onShareVideo");
    }
    startRecordScreen() {
        if (this.recorder) {
            this.recorder.start({
                duration: 16
            });
            this.recorder.onStart(res => {
                this.timeCount = 0;
            });
            this.recorder.onStop(res => {
                this.recordTime = this.timeCount;
                console.log(res.videoPath);
                this.videoPath = res.videoPath;
            });
            this.recorder.onError(res => {
                console.log("========================>录屏失败:", res.errMsg);
            });
        }
        console.log("toutiaoH5GameAPI startRecordScreen");
    }
    stopRecordScreen() {
        if (this.recorder) {
            this.recorder.stop();
        }
        console.log("toutiaoH5GameAPI stopRecordScreen");
    }
    createMoreGamesBtn() {

    }
    showMoreGamesBtn() {
        if (this.isDebug) {
            console.log("调试模式，更多游戏");
            return;
        }
        if (this.tt != null && this.tt != undefined) {
            if (this.systemInfo.platform == "ios") {
                return;
            }

            this.tt.showMoreGamesModal && this.tt.showMoreGamesModal({
                appLaunchOptions: [

                ],
                success: () => {

                },
                fail: (err) => {

                }
            })
        }
    }
}