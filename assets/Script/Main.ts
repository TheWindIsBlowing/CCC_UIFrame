import GameDataManager from "./Managers/GameDataManager";
import UIManager from "./Managers/UIManager";
import LoadingLayer from "./UIScripts/LoadingLayer";
import Platforms, { Platform } from "./Platforms/Platforms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    start() {
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.macro.DOWNLOAD_MAX_CONCURRENT = 4;
        cc.macro.ENABLE_CULLING = false;
        Platforms.getInstance().setPlatform(Platform.toutiao_H5);
        Platforms.getInstance().onInit(null);
        GameDataManager.getInstance().initGameData();
        UIManager.getInstance().showUI(LoadingLayer, 2000);
    }

    // 头条版本更新
    ttUpdateGame() {
        const updateManager = window["tt"].getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("onCheckForUpdate: ", res.hasUpdate);
            if (res.hasUpdate) {
                window["tt"].showToast({
                    title: "即将有更新请留意",
                });
            }
        });

        updateManager.onUpdateReady(() => {
            window["tt"].showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否立即使用？",
                success: function (res) {
                    console.log("confirm res: ", res);
                    if (res.confirm) {
                        // 调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    } else {
                        window["tt"].showToast({
                            icon: "none",
                            title: "小程序下一次「冷启动」时会使用新版本",
                        });
                    }
                },
            });
        });

        updateManager.onUpdateFailed(() => {
            console.log("更新失败");
            window["tt"].showToast({
                title: "更新失败，下次启动继续...",
            });
        });
    }
}
