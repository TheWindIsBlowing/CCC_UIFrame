
import BaseUI from "./BaseUI";
import UIManager from "../Managers/UIManager";
import MainLayer from "./MainLayer";
import ListenerManager from "../Managers/ListenerManager";
import Platforms from "../Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingLayer extends BaseUI {
    protected static className = "LoadingLayer";

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    progressData: cc.Label = null;
    private carRootLength: number = 500;
    /**完成度 */
    private compDegress: number = 0;

    onLoad() {
        Platforms.getInstance().sendMessageFunc("loading");
        ListenerManager.getInstance();
        this.loadSources();
    }
    loadSources() {
        cc.loader.loadResDir("ProjectFile", null, (completedCount, totalCount, item) => {
            this.compDegress = completedCount / totalCount;
        }, (error, assets, urls) => {
            if (error) {
                cc.log("loadSources error :" + error);
                return;
            }

            //setTimeout(() => {
                UIManager.getInstance().showUI(MainLayer, 2010);
                UIManager.getInstance().closeUI(LoadingLayer);
            //}, 1000);
        });
    }

    lastProgress = 0;
    update() {
        //防止进度条倒退
        if (this.lastProgress > this.compDegress) {
            return;
        }
        this.lastProgress = this.compDegress;
        this.progressBar.progress = this.compDegress;
        this.progressData.string = (this.compDegress * 100).toFixed(2) + "%";
    }
}
