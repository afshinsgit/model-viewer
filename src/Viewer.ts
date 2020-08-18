// http://localhost:8080/index.html#k7qzlm5tuhjxelQkz3RMUVtTy5rQCZTnmYFmcvUiyxA
// http://localhost:8080/index.html#PrB4ccMvJO_MakY83JVwNKJLvHmWaG6gaV97ZSJbRAs

import {Engine, Scene, SceneLoader, ArcRotateCamera} from '@babylonjs/core';

  import { setupLight } from './directionalLight';
  import { createSkyDome } from './skyDome';
  import { Gui } from './Gui';
  import { setupPostprocess } from './postProcess';
  import * as Utilities from '@tridify/babylonjs-utilities';

  export default class Viewer {
    
    // public members
    public engine: Engine;
    public canvas: HTMLCanvasElement;
    public scene: Scene = null;
    public camera: ArcRotateCamera;
   
    // private members
    private gui: Gui;
    private conversionID: string;
    private ifcData: any;

    /**
     * Constructor
     */
    constructor() {
      // Get canvas
      this.canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
      // Create engine
      this.engine = new Engine(this.canvas, true)
  
      // Hash routing. Different Hash keys from conversion service can be used to open different models
      this.conversionID = document.location.hash ? window.location.hash.replace("#", "") : null;

      // Events
      window.addEventListener('resize', () => this.engine.resize());
    }
    
    /**
     * Runs the app
     */
    public async run() {
  
      // Load Scene
      await SceneLoader.LoadAsync('./scene/', 'scene.babylon', this.engine).then(async (scene: Scene) => {
        this.scene = scene;
  
        // Load model
        await Utilities.loadModel(this.scene, this.conversionID);

        // This loads the Ifc data of the model, can also be used to get parts. loadIfc(conversionID, "decomposition")
        this.ifcData = await Utilities.loadIfc(this.conversionID);

         // Add and attach camera to the scene
        this.camera = Utilities.createOrbitCamera(this.scene);
        this.scene.activeCamera = this.camera;
        this.scene.activeCamera.attachControl(this.canvas, true);

        // Frame scene so that models are properly in view
        Utilities.frameScene(this.scene, this.camera)

        // Add Gui to the
        this.gui = new Gui;
        
        // Add gui interactions
        this.gui.bindInteraction(this.camera, this.scene);

        // Add light to the scene
        setupLight(this.scene);

        // Add sky to the scene
        createSkyDome(this.scene);

        // Add postprocess to the scene
        setupPostprocess(this.scene, this.camera);

        // Run render loop
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });
      });
    }
  }
