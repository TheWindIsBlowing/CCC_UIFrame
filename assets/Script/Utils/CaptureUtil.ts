import ListenerManager from "../Managers/ListenerManager";
import ListenerType from "../GameData/ListenerType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CaptureUtil extends cc.Component {

    @property(cc.Node)
    captureCamera: cc.Node = null;

    start() {
        ListenerManager.getInstance().register(ListenerType.Capture_Screen, this, this.onCapture);
    }

    private onCapture(cb: Function) {
        this.captureCamera.active = true;
        let texture = new cc.RenderTexture();
        let gl = cc.game["_renderContext"];
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        texture.initWithSize(cc.view.getViewportRect().width, cc.view.getViewportRect().height, gl.STENCIL_INDEX8);
        this.captureCamera.getComponent(cc.Camera).targetTexture = texture;

        this.scheduleOnce(() => {
            // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
            this.captureCamera.getComponent(cc.Camera).render(this.node);
            cb && cb(texture);
            this.captureCamera.active = false;
        });
    }

    onDestroy() {
        ListenerManager.getInstance().removeAll(this);
    }
}
