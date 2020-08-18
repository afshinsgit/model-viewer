import { PhotoDome, Scene} from '@babylonjs/core';

export function createSkyDome(scene: Scene) {
    const photoDome = new PhotoDome(
      'skyDome',
      'public/SkyDome.jpg',
      { resolution: 32, size: 1000 },
      scene,
    );
    // @ts-ignore getting private value
    const skyMesh = photoDome._mesh;
    skyMesh.isPickable = false;
    skyMesh.renderingGroupId = 0;
  }
  