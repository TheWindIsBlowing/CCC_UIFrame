const { ccclass, property } = cc._decorator;

@ccclass
export default class BlurBg extends cc.Component {

    @property(cc.Node)
    targetNode: cc.Node = null;

    start() {

    }

    blur() {
        let node = new cc.Node();
        node.parent = this.targetNode;
        let camera = node.addComponent(cc.Camera);
        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let texture = new cc.RenderTexture();
        let gl = cc.game["_renderContext"];
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        texture.initWithSize(cc.view.getViewportRect().width, cc.view.getViewportRect().height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render(this.targetNode);
        node.destroy();
        this.scheduleOnce(() => {
            let sprite = this.node.getComponent(cc.Sprite);
            if (sprite.spriteFrame) {
                sprite.spriteFrame.setTexture(texture);
            } else {
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
        return texture;
        // node.destroy();
    }

    clear() {
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = null;
    }

}
