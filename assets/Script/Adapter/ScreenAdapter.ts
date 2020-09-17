const {ccclass, property} = cc._decorator;
/**
 * 对齐方式
 */
enum ALIGNMENT{
    ALIGNMENT_FITWIDTH = 1,
    ALIGNMENT_FITHEIGHT,
    ALIGNMENT_FITWIDTH_FITHEIGHT
};
cc.Enum(ALIGNMENT);
@ccclass
export default class ScreenAdapter extends cc.Component {
    @property({
        type:ALIGNMENT,
    })
    alignmentType:ALIGNMENT = ALIGNMENT.ALIGNMENT_FITWIDTH;
    onLoad () {
        // cc.log("调整前");
        // cc.log(`屏幕分辨率: ${cc.view.getCanvasSize().width} x ${cc.view.getCanvasSize().height}`);
        // cc.log(`视图窗口可见区域分辨率: ${cc.view.getVisibleSize().width} x ${cc.view.getVisibleSize().height}`);            
        // cc.log(`视图中边框尺寸: ${cc.view.getFrameSize().width} x ${cc.view.getFrameSize().height}`);
        // cc.log(`设备或浏览器像素比例: ${cc.view.getDevicePixelRatio()}`);
        // cc.log(`画布X:设计X=${cc.view.getScaleX()} ，画布Y:设计Y=${cc.view.getScaleY()}`);
        // cc.log(`节点宽高: ${this.node.width} x ${this.node.height}`);
        // cc.log(`节点缩放: ${this.node.scaleX} x ${this.node.scaleY}`);
        const srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        const realWidth = this.node.width * srcScaleForShowAll;
        const realHeight = this.node.height * srcScaleForShowAll;
        const scale = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
        /**
         * ALIGNMENT.ALIGNMENT_FITWIDTH width不变 height拉伸
         * ALIGNMENT.ALIGNMENT_FITHEIGHT width拉伸 height不变
         * default width拉伸 height拉伸
         */
        if(this.alignmentType === ALIGNMENT.ALIGNMENT_FITWIDTH){
            this.node.setScale(new cc.Vec2(1,scale));
        }else if(this.alignmentType === ALIGNMENT.ALIGNMENT_FITHEIGHT){
            this.node.setScale(new cc.Vec2(scale,1));
        }else{
            this.node.setScale(new cc.Vec2(scale,scale));
        }
        
    }
}
