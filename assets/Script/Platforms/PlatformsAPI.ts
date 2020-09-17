export default interface PlatformsAPI{
    videoType:string;
    arg:any;
    /**初始化 */
    onInit(_callback:Function);
    /**登录*/
    onLogin();
    /**分享游戏链接 */
    onShare(_callback:Function);
    /**分享录屏 */
    onShareVideo(_callback:Function);
    /**创建banner */
    createBanner();
    /**展示banner */
    showBanner();
    /**隐藏banner */
    hideBanner();
    /**创建激励视频 */
    createVideo();
    /**
     * 
     * @param _type 类型
     * @param _arg 参数
     * @param _successCallback 成功回调
     * @param _failCallback 失败回调
     */
    /**展示激励视频 */
    showVideo(_type:string,_arg:any,_successCallback?:Function,_failCallback?:Function);
    /**----------原生平台调用----------
     * 激励视频播放成功后调用(OC->TS || JAVA->TS) 
     */
    showVideoAward();
    /**----------原生平台调用----------
     * 激励视频播放失败后调用(OC->TS || JAVA->TS) 
     */
    showVideoFail();
    /**创建插屏 */
    createInsertAd();
    /**展示插屏 */
    showInsertAd();
    /**创建原生 */
    createNativeAd();
    /**展示原生 */
    showNativeAd(node: cc.Node, func: Function, id: string);
    /**原生被点击 */
    onNativeAdClick(_id:string, flag: number);
    /**隐藏原生广告 */
    hideNativeAd(node: cc.Node, func: Function);
    /**创建原生icon */
    createNativeIconAd();
    /**展示原生icon */
    showNativeIconAd(node: cc.Node, func: Function, id: string);
    /**原生icon被点击 */
    onNativeIconAdClick(_id: string, flag: number);
    /**适配不同渠道存储键值对localstorage
     * 默认使用 localStorage
     */
    saveDataToCache(_key:string,_value:any);
    /**适配不同渠道读取键值对localstorage
     * 默认使用 localStorage
     */
    readDataFromCache(_key:string);
    /**添加游戏到桌面 */
    addDesktop(_callback:Function);
    /**是否已经添加游戏到桌面 */
    haveAddDesktop(_callback: Function);
    /**开始录制视频 */
    startRecordScreen();
    /**结束录制视频 */
    stopRecordScreen();
    /**创建更多游戏按钮 */
    createMoreGamesBtn();
    /**展示更多游戏按钮 */
    showMoreGamesBtn();
}