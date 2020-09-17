import ConstPath from "../GameData/ConstPath";
import ListenerManager from "../Managers/ListenerManager";
const { ccclass, property } = cc._decorator;
export interface UIClass<T extends BaseUI> {
    new(): T;
    getUrl(): string;
}
@ccclass
export default class BaseUI extends cc.Component {

    protected static className: string = "BaseUI";
    protected mTag: any = null;
    public get tag(): any {
        return this.mTag;
    }
    public set tag(_tag: any) {
        this.mTag = _tag;
    }
    public static getUrl(): string {
        return (ConstPath.UIPREFABS_FILE_DIR + this.className);
    }
    onDestroy() {
        ListenerManager.getInstance().removeAll(this);
    }
    public onShow(..._argArray: any[]) {
        //console.log("============>:",_argArray);
    }
}
