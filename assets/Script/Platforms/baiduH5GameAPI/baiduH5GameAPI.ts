import PlatformsAPI from "../PlatformsAPI";

export default class baiduH5GameAPI implements PlatformsAPI{
    videoType:string = "";
    arg:any = null;
    onInit(_callback:Function){

    }
    onLogin(){
        
    }
    onShare(_callback:Function){

    }
    createBanner(){

    }
    showBanner(){

    }
    hideBanner(){

    }
    createVideo(){

    }
    showVideo(_type:string,_arg:any,_successCallback?:Function,_failCallback?:Function){
        this.videoType = _type;
        this.arg = _arg;
    }
    showVideoAward(){
        this.videoType = "";
        this.arg = null;
    }
    showVideoFail(){
        this.videoType = "";
        this.arg = null;
    }
    createInsertAd(){

    }
    showInsertAd(){

    }
    createNativeAd(){

    }
    showNativeAd(){

    }
    onNativeAdClick(_id:string){

    }
    createNativeIconAd(){

    }
    showNativeIconAd(){

    }
    onNativeIconAdClick(_id:string){

    }
    saveDataToCache(_key:string,_value:any){

    }
    readDataFromCache(_key:string){
        
    }
    addDesktop(_callback:Function){
        
    }
    onShareVideo(_callback:Function){
        
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