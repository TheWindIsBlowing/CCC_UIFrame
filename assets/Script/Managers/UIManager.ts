import BaseUI, { UIClass } from "../UIScripts/BaseUI";
const { ccclass, property } = cc._decorator;

export default class UIManager {
    private static mInstance: UIManager = null;
    private uiList: BaseUI[] = [];
    private uiRoot: cc.Node = null;
    public static getInstance(): UIManager {
        if (this.mInstance === null) {
            this.mInstance = new UIManager();
        }
        return this.mInstance;
    }
    constructor() {
        this.uiRoot = cc.find("Canvas");
        console.log("==============================>UiRoot:" + this.uiRoot);
    }
    public getUI<T extends BaseUI>(_uiClass: UIClass<T>): BaseUI {
        for (let i = 0; i < this.uiList.length; ++i) {
            if (this.uiList[i].tag === _uiClass) {
                return this.uiList[i];
            }
        }
        return null;
    }
    public openUI<T extends BaseUI>(_uiClass: UIClass<T>, _zOrder?: number, _callback?: Function, ..._argArray: any[]) {
        if (this.getUI(_uiClass)) {
            return;
        }
        cc.loader.loadRes(_uiClass.getUrl(), cc.Prefab, (..._args) => {
            if (_args) {
                if (_args[0]) {
                    console.error("loadRes error " + _args[0]);
                } else {
                    if (this.getUI(_uiClass)) {
                        return;
                    }
                    const prefab = _args[1] as cc.Prefab;
                    const uiNode = cc.instantiate(prefab) as cc.Node;
                    uiNode.parent = this.uiRoot;
                    uiNode.zIndex = _zOrder;
                    let ui = uiNode.getComponent(_uiClass) as BaseUI;
                    ui.tag = _uiClass;
                    this.uiList.push(ui);
                    _callback && _callback();
                }
            }
        });
    }
    public closeUI<T extends BaseUI>(_uiClass: UIClass<T>) {
        for (let i = 0; i < this.uiList.length; ++i) {
            if (this.uiList[i].tag === _uiClass) {
                this.uiList[i].node.destroy();
                this.uiList.splice(i, 1);
                // let deps = cc.loader.getDependsRecursively(_uiClass.getUrl());
                // cc.loader.release(deps);
                return;
            }
        }
    }
    /**
     * 显示UI
     * @param _uiClass UI页面名称
     * @param _zOrder UI渲染层级
     * @param _callback 完成操作后的回调
     * @param _isEffect 是否启用缩放效果
     * @param _argArray 携带参数数组
     */
    public showUI<T extends BaseUI>(_uiClass: UIClass<T>, _zOrder: number = 2000, _callback?: Function, _isEffect: boolean = false, ..._argArray: any[]) {
        let ui = this.getUI(_uiClass);
        if (ui) {
            ui.node.zIndex = _zOrder;
            ui.node.active = true;
            ui.onShow(..._argArray);
            // this.makeEffect(_isEffect, ui);
            if (_isEffect) {
                let effectNode: cc.Node = ui.node.getChildByName("effectNode");
                if (effectNode) {
                    effectNode.scale = 0;
                    cc.tween(effectNode).to(0.2, { scale: 1 }, { easing: "expoIn" }).start();
                }
            }
            if (_callback) {
                _callback();
            }
        }
        else {
            this.openUI(_uiClass, _zOrder, () => {
                _callback && _callback();
                let ui = this.getUI(_uiClass);
                ui.onShow(..._argArray);
                // this.makeEffect(_isEffect, ui);
                if (_isEffect) {
                    let effectNode: cc.Node = ui.node.getChildByName("effectNode");
                    if (effectNode) {
                        effectNode.scale = 0;
                        cc.tween(effectNode).to(0.2, { scale: 1 }, { easing: "expoIn" }).start();
                    }
                }
            });
        }
    }

    private makeEffect(_isEffect: boolean, ui: BaseUI) {
        if (_isEffect) {
            let effectNode: cc.Node = ui.node.getChildByName("effectNode");
            if (effectNode) {
                effectNode.opacity = 80;
                cc.tween(effectNode).to(0.3, { opacity: 255 })
                    .start();
            }
        }
    }
    /**
     * 隐藏UI
     * @param _uiClass UI页面名称
     * @param _isEffect 是否启用缩放效果
     */
    public hideUI<T extends BaseUI>(_uiClass: UIClass<T>, _isEffect: boolean = false) {
        let ui = this.getUI(_uiClass);
        if (ui) {
            // this.hideEffect(_isEffect, ui);
            if (_isEffect) {
                let effectNode: cc.Node = ui.node.getChildByName("effectNode");
                cc.tween(effectNode)
                    .to(0.2, { scale: 0 }, { easing: "expoOut" })
                    .call(() => {
                        ui.node.active = false;
                    })
                    .start();
            } else {
                ui.node.active = false;
            }
        }
    }

    private hideEffect(_isEffect: boolean, ui: BaseUI) {
        if (_isEffect) {
            let effectNode: cc.Node = ui.node.getChildByName("effectNode");
            cc.tween(effectNode)
                .to(0.3, { opacity: 80 })
                .call(() => {
                    ui.node.active = false;
                })
                .start();
        } else {
            ui.node.active = false;
        }
    }
    /**
     * 预加载UI
     * @param _uiClass UI页面名称
     */
    public preLoadUI<T extends BaseUI>(_uiClass: UIClass<T>) {
        if (this.getUI(_uiClass)) {
            return;
        }
        cc.loader.loadRes(_uiClass.getUrl(), cc.Prefab, (..._args) => {
            if (_args) {
                if (_args[0]) {
                    console.error("loadRes error " + _args[0]);
                } else {
                    if (this.getUI(_uiClass)) {
                        return;
                    }
                    const prefab = _args[1] as cc.Prefab;
                    const uiNode = cc.instantiate(prefab) as cc.Node;
                    uiNode.parent = this.uiRoot;
                    let ui = uiNode.getComponent(_uiClass) as BaseUI;
                    ui.tag = _uiClass;
                    this.uiList.push(ui);
                }
            }
        });
    }

}