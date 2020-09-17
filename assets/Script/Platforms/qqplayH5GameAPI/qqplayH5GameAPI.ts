import PlatformsAPI from "../PlatformsAPI";

export default class qqplayH5GameAPI implements PlatformsAPI{
    videoType:string = "";
    arg:any = null;
    /**平台环境 */
    qq:any = window["qq"];
    /**banner广告 */
    bannerAd:any = null;
    /**视频广告 */
    rewardedVideoAd:any = null;
    /**视频广告是否已经load到数据 */
    m_videoAdIsLoaded:boolean = false;
    /**box */
    boxAd:any = null;
    /**分享图地址 */
    shareUrl:string = "https://www.zywxgames.com/Resource/chengzhi/RacingProject/qqGame/icon.png";

    windowWidth:number = 0;
    windowHeight:number = 0;


    onInit(_callback:Function){
        _callback && _callback();
        if(this.qq != null && this.qq != undefined){
            this.qq.updateShareMenu({
                withShareTicket: true
            });
            this.qq.showShareMenu({
                showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
            });
            this.qq.onShareAppMessage(() => ({
                title: "沙雕赛马",
                imageUrl: this.shareUrl // 图片 URL
            }));
            let res = this.qq.getSystemInfoSync();
            if(res){
                this.windowWidth = res.windowWidth;
                this.windowHeight = res.windowHeight;
                console.log("=========================>windowWidth:",this.windowWidth);
                console.log("=========================>windowHeight:",this.windowHeight);
            }
        }
        this.createBanner();
        this.createVideo();
        console.log("qqplayH5GameAPI onInit");
    }
    onLogin(){
        
    }
    onShare(_callback:Function){
        if(this.qq != null && this.qq != undefined){
            
            this.qq.shareAppMessage({
                title:"沙雕赛马",
                imageUrl:this.shareUrl,
                success:()=>{
                    
                },
                fail:()=>{
                    
                }
            });
        }
        console.log("qqplayH5GameAPI onShare");
    }
    createBanner(){
        if(this.qq != null && this.qq != undefined){
            let targetBannerAdWidth = 300;
            this.bannerAd = this.qq.createBannerAd({
                adUnitId:  "c43182c18080ab46bf7f8bf1f58b9b5f",
                style: {
                    width: targetBannerAdWidth,
                    top: (this.windowHeight - targetBannerAdWidth / 16 * 9)/2 + (targetBannerAdWidth / 16 * 9)+20,
                    left:(this.windowWidth-targetBannerAdWidth)/2,
                    height:targetBannerAdWidth / 16 * 9,
                },
                testDemoType: 65,
            });
        }
        console.log("qqplayH5GameAPI createBanner");
    }
    showBanner(){
        if(this.bannerAd){
            this.bannerAd.show()
            .then(() => {
                console.log('广告显示成功');
            })
            .catch(err => {
                console.log('广告组件出现问题', err);
            });
            // 尺寸调整时会触发回调
            this.bannerAd.onResize(size => {
            console.log(size.width, size.height);
            this.bannerAd.style.top = this.windowHeight - this.bannerAd.style.realHeight;
            this.bannerAd.style.left = (this.windowWidth - this.bannerAd.style.realWidth)/2;
            });
        }
        console.log("qqplayH5GameAPI showBanner");
    }
    hideBanner(){
        if(this.bannerAd){
            this.bannerAd.hide();
        }
        console.log("qqplayH5GameAPI hideBanner");
    }
    createVideo(){
        if(this.qq != null && this.qq != undefined){
            this.rewardedVideoAd = this.qq.createRewardedVideoAd({
                adUnitId: "8422fdfb517fc349a27500c5bf88502a"
            });
            this.rewardedVideoAd.load();
            this.rewardedVideoAd.onLoad(()=>{
                console.log("onload激励视频广告加载成功");
                this.m_videoAdIsLoaded = true;
            });
            this.rewardedVideoAd.onError(err => {
                console.log("onload激励视频广告加载失败-->errMsg:",err.errMsg,"==>errCode:",err.errCode);
                this.m_videoAdIsLoaded = false;
            });
        }
        console.log("qqplayH5GameAPI createVideo");
    }
    showVideo(_type:string,_arg:any,_successCallback?:Function,_failCallback?:Function){
        this.videoType = _type;
        this.arg = _arg;
        if(this.rewardedVideoAd && this.m_videoAdIsLoaded){
            this.rewardedVideoAd.show();
            this.rewardedVideoAd.onClose(res=>{
                if (res && res.isEnded) {
                    console.log("onClose正常播放结束，可以下发游戏奖励");
                    _successCallback && _successCallback();
                    this.m_videoAdIsLoaded = false;
                    this.rewardedVideoAd.load();
                    
                } else {
                    console.log("onClose播放中途退出，不下发游戏奖励");
                    _failCallback && _failCallback();
                    this.rewardedVideoAd.load();
                    
                }
            });
        }else{
            
        }
        console.log("qqplayH5GameAPI showVideo===videoType>:",this.videoType);
        console.log("qqplayH5GameAPI showVideo===arg>:",this.arg);
    }
    showVideoAward(){
        this.videoType = "";
        this.arg = null;
        console.log("qqplayH5GameAPI showVideoAward");
    }
    showVideoFail(){
        this.videoType = "";
        this.arg = null;
        console.log("qqplayH5GameAPI showVideoFail");
    }
    createInsertAd(){
        console.log("qqplayH5GameAPI createInsertAd");
    }
    showInsertAd(){
        console.log("qqplayH5GameAPI showInsertAd");
    }
    createNativeAd(){
        console.log("qqplayH5GameAPI createNativeAd");
    }
    showNativeAd(){
        console.log("qqplayH5GameAPI showNativeAd");
    }
    onNativeAdClick(_id:string){
        console.log("qqplayH5GameAPI onNativeAdClick");
    }
    createNativeIconAd(){

    }
    showNativeIconAd(){

    }
    onNativeIconAdClick(_id:string){
        
    }
    saveDataToCache(_key:string,_value:any){
        console.log("qqplayH5GameAPI saveDataToCache");
    }
    readDataFromCache(_key:string){
        console.log("qqplayH5GameAPI readDataFromCache");
    }
    addDesktop(_callback:Function){
        console.log("qqplayH5GameAPI addDesktop");
    }
    onShareVideo(_callback:Function){
        console.log("qqplayH5GameAPI onShareVideo");
    }
    startRecordScreen(){

    }
    stopRecordScreen(){
        
    }
    createMoreGamesBtn(){

    }
    showMoreGamesBtn(){
        
    }
}