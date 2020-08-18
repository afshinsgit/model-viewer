import {Scene, ArcRotateCamera, SSAO2RenderingPipeline, FxaaPostProcess} from '@babylonjs/core';

export function setupPostprocess(scene: Scene, camera: ArcRotateCamera)
{
    const ssaoRatio = {
        ssaoRatio: 0.5, // Ratio of the SSAO
        blurRatio: 0.5  // Ratio of the combine post-process
    };

    if (SSAO2RenderingPipeline.IsSupported) {
        const postProcess = new FxaaPostProcess("fxaa", 6.0, camera);
        const ssao = new SSAO2RenderingPipeline("ssao", scene, ssaoRatio);
        ssao.radius = 0.1;
        ssao.totalStrength = 0.5;
        ssao.expensiveBlur = true;
        ssao.samples = 16;
        ssao.maxZ = 250;
        // Attach camera to the SSAO render pipeline
        scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);

        // Manage SSAO
        let isAttached = true;
        window.addEventListener("keydown", (evt) => {
            // draw SSAO when pressed "1"
            if (evt.keyCode === 49) {
                if (!isAttached) {
                    isAttached = true;
                    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);
                }
                scene.postProcessRenderPipelineManager.enableEffectInPipeline("ssao", ssao.SSAOCombineRenderEffect, camera);
            }
                // draw without SSAO when pressed "2"
            else if (evt.keyCode === 50) {
                isAttached = false;
                scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("ssao", camera);
            }
                // draw only SSAO when pressed "3"
            else if (evt.keyCode === 51) {
                if (!isAttached) {
                    isAttached = true;
                    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);
                }
                scene.postProcessRenderPipelineManager.disableEffectInPipeline("ssao", ssao.SSAOCombineRenderEffect, camera);
            }
        });
    } else {
        alert("WebGL2 is required to use SSAO2");
    }
}
