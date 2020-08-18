import {Button, AdvancedDynamicTexture} from '@babylonjs/gui/2D'
import {Scene} from '@babylonjs/core'
import {setCamLeftView, setCamRightView, setCamTopView, setCamBottomView} from './camUtils'

export class Gui {

    // Private members
    private leftViewButton: Button;
    private rightViewButton: Button;
    private topViewButton: Button;
    private bottomViewButton: Button;
    private advancedDynamicTexture: AdvancedDynamicTexture;

    /**
     * Constructor
     */
    constructor() {
        
        this.advancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.leftViewButton = this.createSimpleUIButton(this.advancedDynamicTexture, "Left", "150", "40", "15", "-15");
        this.rightViewButton = this.createSimpleUIButton(this.advancedDynamicTexture, "Right", "150", "40", "15", "-50");
        this.topViewButton = this.createSimpleUIButton(this.advancedDynamicTexture, "Top", "150", "40", "15", "-85");
        this.bottomViewButton = this.createSimpleUIButton(this.advancedDynamicTexture, "Bottom", "150", "40", "15", "-120");
    }

    public bindInteraction(camera: any, scene: Scene)
    {
        this.leftViewButton.onPointerClickObservable.add(() => setCamLeftView(camera, scene));
        this.rightViewButton.onPointerClickObservable.add(() => setCamRightView(camera, scene));
        this.topViewButton.onPointerClickObservable.add(() => setCamTopView(camera, scene));
        this.bottomViewButton.onPointerClickObservable.add(() => setCamBottomView(camera, scene));
    }

    private createSimpleUIButton(advancedDynamicTexture: AdvancedDynamicTexture, buttonText: string, buttonWidth: string, buttonHeight: string, buttonLeft: string, buttonTop: string): Button
    {
        const button = Button.CreateSimpleButton("but", buttonText);
        button.width = buttonWidth + "px";
        button.height = buttonHeight + "px";
        button.color = "black";
        button.background = "white";
        button.verticalAlignment = 1;
        button.horizontalAlignment = 0;
        button.left = buttonLeft + "px";
        button.top = buttonTop + "px";
        advancedDynamicTexture.addControl(button);

        return button;
    }
}
