import {Vector3, Scene, Animation, CubicEase, EasingFunction} from '@babylonjs/core'

export function setCamLeftView(camera: any, scene: Scene) {
    const targetEndPosition = new Vector3(5, 15, 0);
    const camEndPosition = new Vector3(-85, 15, 0);
    camera = scene.activeCamera;
    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation('at4', camera, 'position', 200, 400, camera.position, camEndPosition, 0, ease);
    Animation.CreateAndStartAnimation('at5', camera, 'target', 200, 400, camera.target, targetEndPosition, 0, ease);
};

export function setCamRightView(camera: any, scene: Scene) {
    const targetEndPosition = new Vector3(-5, 15, 0);
    const camEndPosition = new Vector3(85, 15, 0);
    camera = scene.activeCamera;
    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation('at4', camera, 'position', 200, 400, camera.position, camEndPosition, 0, ease);
    Animation.CreateAndStartAnimation('at5', camera, 'target', 200, 400, camera.target, targetEndPosition, 0, ease);
};

export function setCamTopView(camera: any, scene: Scene) {
    const targetEndPosition = new Vector3(0, -5, 0);
    const camEndPosition = new Vector3(0, 85, 0);
    camera = scene.activeCamera;
    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation('at4', camera, 'position', 200, 400, camera.position, camEndPosition, 0, ease);
    Animation.CreateAndStartAnimation('at5', camera, 'target', 200, 400, camera.target, targetEndPosition, 0, ease);
};

export function setCamBottomView(camera: any, scene: Scene) {
    const targetEndPosition = new Vector3(0, 5, 0);
    const camEndPosition = new Vector3(0, -85, 0);
    camera = scene.activeCamera;
    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation('at4', camera, 'position', 200, 400, camera.position, camEndPosition, 0, ease);
    Animation.CreateAndStartAnimation('at5', camera, 'target', 200, 400, camera.target, targetEndPosition, 0, ease);
};
