import PlatformsAPI from "../PlatformsAPI";
import GameIdConfig from "../GameIdConfig";
import GameDataManager from "../../Managers/GameDataManager";
import { TipUtils } from "../../Utils/TipUtils";

export default class oppoH5GameAPI implements PlatformsAPI {
    videoType: string;
    arg: any;

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

    /**原生1 */
    nativeAd1: any = null;
    /**原生2 */
    nativeAd2: any = null;
    /**原生3 */
    nativeAd3: any = null;
    /**原生3 */
    nativeAd4: any = null;
    /**原生3 */
    nativeAd5: any = null;

    /**原生icon1 */
    nativeIconAd1: any = null;
    /**原生icon2 */
    nativeIconAd2: any = null;
    /**原生icon3 */
    nativeIconAd3: any = null;
    /**系统信息 */
    systemInfo: any = null;

    /**是否调试模式 */
    isDebug: boolean = true;

    private isBannerShow: boolean = false; // banner广告是否显示
    private isNativeAdShow: boolean = false; // 原生广告是否显示
    private nativeIconArr: Array<cc.Node> = []; // 原生icon节点
    private nativeAdArr: Array<cc.Node> = []; // 原生广告节点

    /**初始化 */
    onInit(_callback: Function) {
        if (this.qg !== null && this.qg !== undefined) {
            this.systemInfo = this.qg.getSystemInfoSync();
            this.qg.setEnableDebug({
                enableDebug: false, // true 为打开，false 为关闭
                success: function () {
                    console.log("test consol log");
                    console.info("test console info");
                    console.warn("test consol warn");
                    console.debug("test consol debug");
                    console.error("test consol error");
                },
                complete: function () {
                },
                fail: function () {
                }
            });
            this.qg.reportMonitor('game_scene', 0);
        } else {
            this.qg = null;
        }
        _callback && _callback();
        this.createVideo();
        console.log("oppoH5GameAPI=============================>:onInit");

    }
    /**登录*/
    onLogin() {

    }
    /**分享游戏链接 */
    onShare(_callback: Function) {

    }
    /**分享录屏 */
    onShareVideo(_callback: Function) {

    }
    /**创建banner */
    createBanner() {

    }
    /**展示banner */
    showBanner() {
        if (this.qg !== null && this.qg !== undefined) {
            if (this.systemInfo.platformVersionCode < 1051) {
                console.log("版本号过低 无法创建横幅广告");
                return;
            }

            console.log("isNativeAdShow banner: ", this.isNativeAdShow);
            if(this.isNativeAdShow) {
                return;
            }

            let bannerNum = GameDataManager.getInstance().getGameData()["hideBannerCount"];
            console.log("hideBannerCount: ", bannerNum);
            if (bannerNum >= 5) {
                console.log("今日无已banner无广告");
                return;
            }

            if(this.isBannerShow) {
                console.log("isShowing banner");
                return;
            }

            console.log("oppo平台 创建横幅广告");
            this.bannerAd = this.qg.createBannerAd({
                adUnitId: GameIdConfig.oppoID["bannerAdId"],
            });
            this.bannerAd.show();
            this.bannerAd.onShow(() => {
                console.log("横幅广告调用 onShow");
                this.isBannerShow = true;
            });

            let onHideFunc = () => {
                console.log("横幅广告调用 onHide");
                GameDataManager.getInstance().changeBannerHideCount();
                this.isBannerShow = false;
                this.bannerAd.offHide(onHideFunc);
            }
            this.bannerAd.onHide(onHideFunc);
        }
        console.log("oppoH5GameAPI showBanner");
    }
    /**隐藏banner */
    hideBanner() {
        if (this.bannerAd) {
            console.log("Oppo平台 销毁横幅广告");
            this.bannerAd.destroy();
            this.bannerAd = null;
            this.isBannerShow = false;
        }
        console.log("oppoH5GameAPI hideBanner");
    }
    /**创建激励视频 */
    createVideo() {
        if (this.qg !== null && this.qg !== undefined) {
            if (this.systemInfo.platformVersionCode < 1051) {
                console.log("版本号过低 无法创建激励视频广告");
                return;
            }
            if (this.rewardedVideoAd) {
                console.log("Oppo平台 销毁激励视频广告");
                this.rewardedVideoAd.destroy();
                this.rewardedVideoAd = null;
            }
            /**创建rewardedVideoAd 对象*/
            console.log("Oppo平台 创建激励视频广告");
            this.rewardedVideoAd = this.qg.createRewardedVideoAd({
                adUnitId: GameIdConfig.oppoID["rewardedVideoAdId"],
            });
            this.rewardedVideoAd.load();
            this.rewardedVideoAd.onLoad(() => {
                console.log("激励视频广告 加载成功");
                this.m_videoAdIsLoaded = true;
            });
            this.rewardedVideoAd.onError((err) => {
                console.log('OPPOH5GameAPI RewardedVideo load Error:code =====>:', err.code, "message ======>:", err.errMsg);
                console.log("激励视频广告 加载失败");
                this.m_videoAdIsLoaded = false;
            });
        }
        console.log("oppoH5GameAPI createVideo");
    }
    /**
     * 
     * @param _type 类型
     * @param _arg 参数
     * @param _successCallback 成功回调
     * @param _failCallback 失败回调
     */
    /**展示激励视频 */
    showVideo(_type: string, _arg: any, _successCallback?: Function, _failCallback?: Function) {
        if(this.isDebug) {
            console.log("调试模式，可以下发游戏奖励");
            _successCallback && _successCallback();
            TipUtils.showTip('视频观看完成，获得奖励');
            return;
        }
        this.videoType = _type;
        this.arg = _arg;
        /**确保video正常创建并已经拉取到数据 */
        if (this.rewardedVideoAd && this.m_videoAdIsLoaded) {
            this.rewardedVideoAd.show();
            const onClose = (res) => {
                if (res.isEnded) {
                    console.log("激励视频广告播放完成 发放奖励");
                    TipUtils.showTip("已成功获得奖励");
                    /**播放完毕 处理播放成功的逻辑 */
                    _successCallback && _successCallback();
                    this.rewardedVideoAd.load();
                } else {
                    console.log('激励视频广告未观看完成，不发放奖励')
                    TipUtils.showTip("未完整观看视频，无法获得奖励");
                    /**播放失败 处理播放失败的逻辑 */
                    _failCallback && _failCallback();
                    this.rewardedVideoAd.load();
                }
                this.rewardedVideoAd.offClose(onClose);
            }
            this.rewardedVideoAd.onClose(onClose);
        } else {
            /**没有成功创建广告或者没有成功load广告 就重新创建一个 */
            console.log("广告还未准备好,请稍后再试");
            TipUtils.showTip("视频还未准备好，请稍后再试...");
            this.createVideo();
        }
    }
    /**----------原生平台调用----------
     * 激励视频播放成功后调用(OC->TS || JAVA->TS) 
     */
    showVideoAward() {
        this.videoType = "";
        this.arg = null;
    }
    /**----------原生平台调用----------
     * 激励视频播放失败后调用(OC->TS || JAVA->TS) 
     */
    showVideoFail() {
        this.videoType = "";
        this.arg = null;
    }
    /**创建插屏 */
    createInsertAd() {

    }
    /**展示插屏 */
    showInsertAd() {

    }
    /**创建原生 */
    createNativeAd() {

    }
    /**展示原生 */
    showNativeAd(node: cc.Node, func: Function, id: string) {
        if (this.qg != null && this.qg != undefined) {
            if (this.systemInfo.platformVersionCode < 1051) {
                console.log("版本号过低 无法创建原生广告");
                return;
            }

            for(let i = 0; i < this.nativeAdArr.length; i++) {
                if(node.name == this.nativeAdArr[i].name) {
                    break;
                }
            }
            this.nativeAdArr.push(node);

            // 奖励弹窗界面
            if(id == GameIdConfig.oppoID["nativeIdReward"]) {
                if(this.nativeAd1) {
                    this.nativeAd1 = null;
                }
                this.nativeAd1 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeAd1.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.isNativeAdShow = true;
    
                            this.hideBanner();
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeAd1.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeAd1.offLoad(loadFunc);
                }
                this.nativeAd1.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    this.nativeAd1.offError(errorFunc);
                }
                this.nativeAd1.onError(errorFunc);
            }
            // 失败结算
            else if(id == GameIdConfig.oppoID["nativeIdFail"]) {
                if(this.nativeAd2) {
                    this.nativeAd2 = null;
                }
                this.nativeAd2 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeAd2.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.isNativeAdShow = true;
    
                            this.hideBanner();
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeAd2.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeAd2.offLoad(loadFunc);
                }
                this.nativeAd2.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    this.nativeAd2.offError(errorFunc);
                }
                this.nativeAd2.onError(errorFunc);
            }
            // 成功结算
            else if(id == GameIdConfig.oppoID["nativeIdSuccess"]) {
                if(this.nativeAd3) {
                    this.nativeAd3 = null;
                }
                this.nativeAd3 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeAd3.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.isNativeAdShow = true;
    
                            this.hideBanner();
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeAd3.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeAd3.offLoad(loadFunc);
                }
                this.nativeAd3.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    this.nativeAd3.offError(errorFunc);
                }
                this.nativeAd3.onError(errorFunc);
            }
            // 体力不足界面
            else if(id == GameIdConfig.oppoID["nativeIdLessEnergy"]) {
                if(this.nativeAd4) {
                    this.nativeAd4 = null;
                }
                this.nativeAd4 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeAd4.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.isNativeAdShow = true;
    
                            this.hideBanner();
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeAd4.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeAd4.offLoad(loadFunc);
                }
                this.nativeAd4.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    this.nativeAd4.offError(errorFunc);
                }
                this.nativeAd4.onError(errorFunc);
            }
            // 成功结算 然后弹出 金币大礼包界面
            else if(id == GameIdConfig.oppoID["nativeIdSuccessReward"]) {
                if(this.nativeAd5) {
                    this.nativeAd5 = null;
                }
                this.nativeAd5 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeAd5.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.isNativeAdShow = true;
    
                            this.hideBanner();
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeAd5.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeAd5.offLoad(loadFunc);
                }
                this.nativeAd5.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    this.nativeAd5.offError(errorFunc);
                }
                this.nativeAd5.onError(errorFunc);
            }
        }
        console.log("oppoH5GameAPI showNativeAd");
    }
    /**原生被点击 */
    onNativeAdClick(_id: string, flag: number = null) {
        console.log("flag: ", flag);
        console.log("id: ", _id);
        console.log(this.nativeAd1);
        console.log(this.nativeAd2);
        console.log(this.nativeAd3);
        if(flag == 1) {
            if (this.nativeAd1) {
                this.nativeAd1.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 2) {
            if (this.nativeAd2) {
                this.nativeAd2.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 3) {
            if (this.nativeAd3) {
                this.nativeAd3.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 4) {
            if (this.nativeAd4) {
                this.nativeAd4.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 5) {
            if (this.nativeAd5) {
                this.nativeAd5.reportAdClick({
                    adId: _id
                });
            }
        }
    }
    /**隐藏原生广告 */
    hideNativeAd(node: cc.Node = null, func: Function = null) {
        // for(let i = 0; i < this.nativeAdArr.length; i++) {
        //     this.nativeAdArr[i].active = false;
        // }
        this.isNativeAdShow = false;
    }

    /**创建原生icon */
    createNativeIconAd() {

    }
    /**展示原生icon */
    showNativeIconAd(node: cc.Node, func: Function, id: string) {
        if(this.qg != null && this.qg != undefined){
            if(this.systemInfo.platformVersionCode < 1051){
                console.log("版本号过低 无法创建原生icon广告");
                return;
            }

            console.log("isNativeAdShow icon: ", this.isNativeAdShow);
            if(this.isNativeAdShow) {
                return;
            }

            // 我的小家 原生icon
            if(id == GameIdConfig.oppoID["nativeIconIdDecorate"]) {
                if(this.nativeIconAd1){
                    console.log("Oppo平台 赋空原生icon广告");
                    this.nativeIconAd1 = null;
                }
                this.nativeIconAd1 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeIconAd1.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeIconAd1.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeIconAd1.offLoad(loadFunc);
                }
                this.nativeIconAd1.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    console.log(err.errCode, "    ", err.errMsg);
                    this.nativeIconAd1.offError(errorFunc);
                }
                this.nativeIconAd1.onError(errorFunc);
            }
            //  关卡 原生icon
            else if(id == GameIdConfig.oppoID["nativeIconIdLevel"]) {
                if(this.nativeIconAd2){
                    console.log("Oppo平台 赋空原生icon广告");
                    this.nativeIconAd2 = null;
                }
                this.nativeIconAd2 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeIconAd2.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeIconAd2.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeIconAd2.offLoad(loadFunc);
                }
                this.nativeIconAd2.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    console.log(err.errCode, "    ", err.errMsg);
                    this.nativeIconAd2.offError(errorFunc);
                }
                this.nativeIconAd2.onError(errorFunc);
            }
            // 主界面原生icon
            else if(id == GameIdConfig.oppoID["nativeIconIdHome"]) {
                if(this.nativeIconAd3){
                    console.log("Oppo平台 赋空原生icon广告");
                    this.nativeIconAd3 = null;
                }
                this.nativeIconAd3 = this.qg.createNativeAd({
                    adUnitId: id,
                });
                this.nativeIconAd3.load();
    
                let loadFunc = (res) => {
                    console.log(res);
                    if (res && res.adList) {
                        let resTemp = res.adList.pop();
                        console.log("=============================>resTemp:", resTemp);
                        if (resTemp) {
    
                            this.hideNativeIcon();
    
                            func && func(resTemp);
                            this.nativeIconAd3.reportAdShow({
                                adId: resTemp.adId
                            });
                        }
                    }
                    this.nativeIconAd3.offLoad(loadFunc);
                }
                this.nativeIconAd3.onLoad(loadFunc);
    
                let errorFunc = (err) => {
                    console.log("native ad onError : ", err);
                    console.log(err.errCode, "    ", err.errMsg);
                    this.nativeIconAd3.offError(errorFunc);
                }
                this.nativeIconAd3.onError(errorFunc);
            }

            for(let i = 0; i < this.nativeIconArr.length; i++) {
                if(node.name == this.nativeIconArr[i].name) {
                    return;
                }
            }
            this.nativeIconArr.push(node);
        }
        console.log("oppoH5GameAPI showNativeAd icon");
    }
    /**原生icon被点击 */
    onNativeIconAdClick(_id: string, flag: number) {
        console.log("flag: ", flag);
        console.log("id: ", _id);
        console.log(this.nativeIconAd1);
        console.log(this.nativeIconAd2);
        if(flag == 1) {
            if (this.nativeIconAd1) {
                this.nativeIconAd1.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 2) {
            if (this.nativeIconAd2) {
                this.nativeIconAd2.reportAdClick({
                    adId: _id
                });
            }
        }
        else if(flag == 3) {
            if (this.nativeIconAd3) {
                this.nativeIconAd3.reportAdClick({
                    adId: _id
                });
            }
        }
    }
    /**隐藏原生icon */
    hideNativeIcon(node: cc.Node = null, func: Function = null) {
        console.log(this.nativeIconArr.length);
        for(let i = 0; i < this.nativeIconArr.length; i++) {
            if(this.nativeIconArr[i]) {
                this.nativeIconArr[i].active = false;
            }
        }
    }
    /**适配不同渠道存储键值对localstorage
     * 默认使用 localStorage
     */
    saveDataToCache(_key: string, _value: any) {

    }
    /**适配不同渠道读取键值对localstorage
     * 默认使用 localStorage
     */
    readDataFromCache(_key: string) {

    }
    /**添加icon到桌面 */
    addDesktop(_callback: Function) {
        if(this.isDebug) {
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
                success: (res)=> {
                    console.log("installShortcut");
                    setTimeout(() => {
                        this.qg.hasShortcutInstalled({
                            success: function (status) {
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
                fail: function (err) {
                    console.log("创建失败", err);
                    _callback && _callback(0);
                },
                complete: function () {

                }
            })
        }
    }
    // 检测是否添加桌面图标
    haveAddDesktop(_callback: Function) {
        if(this.isDebug) {
            _callback(0);
            return;
        }
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
    /**开始录制视频 */
    startRecordScreen() {

    }
    /**结束录制视频 */
    stopRecordScreen() {

    }
    /**创建更多游戏按钮 */
    createMoreGamesBtn() {

    }
    /**展示更多游戏按钮 */
    showMoreGamesBtn() {

    }
    /**
     * 跳转游戏
     * @param _packageName 包名
     */
    jumpToGame(_packageName: string) {
        if (this.qg !== null && this.qg !== undefined) {
            let obj = { pkgName: _packageName };
            this.qg.navigateToMiniGame(obj);
        }
        console.log("oppoH5GameAPI=============================>:jumpToGame");
    }
    /** 添加彩签*/
    addColorBookmark() {

    }
    /**订阅app */
    addSubscribeApp() {

    }
    onCloseInsertOrNative() {
        
    }
}