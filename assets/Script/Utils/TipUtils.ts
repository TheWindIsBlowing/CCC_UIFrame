import UIManager from "../Managers/UIManager";
import { TipLayer } from "../UIScripts/TipLayer";

export class TipUtils {

    public static showTip(message: string, isEnergy: boolean = false): void {
        let tipUI = UIManager.getInstance().getUI(TipLayer) as TipLayer;
        if (!tipUI) {
            UIManager.getInstance().openUI(TipLayer, cc.macro.MAX_ZINDEX, () => {
                TipUtils.showTip(message, isEnergy);
            });
        }
        else {
            tipUI.showTip(message, isEnergy);
        }
    }
}
