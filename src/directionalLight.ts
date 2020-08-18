import { Scene, DirectionalLight, ShadowGenerator, Vector3, Color3, HemisphericLight, InstancedMesh, RenderTargetTexture} from '@babylonjs/core';

export function setupLight(scene: Scene) {
    const hemisphericLight = new HemisphericLight('HemiLight', new Vector3(0, 1, 0), scene);
    hemisphericLight.intensity = 0.8; 
    hemisphericLight.groundColor = new Color3(0.8, 0.8, 0.8);
    hemisphericLight.shadowEnabled = false;
    const directionalLight: DirectionalLight = new DirectionalLight('DirectionalLight', new Vector3(-1, -2, -1), scene);
    directionalLight.position = new Vector3(-20, 40, -15);
    directionalLight.setDirectionToTarget(new Vector3(0, 0, 0));
    directionalLight.intensity = 1;
    directionalLight.radius = 100;
    directionalLight.shadowMinZ = 0.1;
    directionalLight.shadowMaxZ = 100;
    directionalLight.shadowEnabled = true;
    directionalLight.autoUpdateExtends = false;  
    const shadowGenerator: ShadowGenerator = new ShadowGenerator(2048, directionalLight);
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurScale = 1.0;
    shadowGenerator.blurKernel = 10.0;
    shadowGenerator.bias = 0.001;
    shadowGenerator.frustumEdgeFalloff = 2.4;
    shadowGenerator.setDarkness(0);
    setupShadowmap(scene, shadowGenerator);
}

function setupShadowmap(scene: Scene, shadowGenerator: ShadowGenerator) {

    const shadowMap = shadowGenerator.getShadowMap();
    if (shadowMap) {
      scene.meshes.forEach((m) => {
        if (!(m as InstancedMesh).sourceMesh) {
          m.receiveShadows = true;
          if (shadowMap.renderList)
            shadowMap.renderList.push(m);
        }
      });
      shadowMap.refreshRate = RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
    }
  }
  