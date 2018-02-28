// / <reference path="easeljs/easeljs.d.ts" />

declare namespace lib {
  export class Preloader extends createjs.Container {
    static nominalBounds: createjs.Rectangle;
    instance: PreloaderAsset;
    instance_1: PreloaderAsset;
  }

  export class PreloaderCircle extends createjs.Container {
    static nominalBounds: createjs.Rectangle;
    shape: createjs.Shape;
  }

  export class PreloaderCircleGr extends createjs.MovieClip {
    static nominalBounds: createjs.Rectangle;
    instance: PreloaderCircle;
  }

  export class PreloaderAsset extends createjs.MovieClip {
    static nominalBounds: createjs.Rectangle;
    instance: PreloaderCircleGr;
    instance_1: PreloaderCircleGr;
    instance_2: PreloaderCircleGr;
    instance_3: PreloaderCircleGr;
    instance_4: PreloaderCircleGr;
    constructor();
  }
}
