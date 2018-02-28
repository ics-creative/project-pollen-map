import { MEDIA_SM_WIDTH } from './AppConst';

declare var images: any;

let stageW: number = 960;
let stageH: number = 540;

export class FrontView extends createjs.Container {
  private preloader: createjs.DisplayObject;
  private title: createjs.Bitmap;

  public init() {
    this.title = new createjs.Bitmap(window['images']['Logo']);

    this.addChild(this.title);

    this.preloader = new window['lib'].PreloaderAsset();
    this.addChild(this.preloader);
  }

  public complete() {
    this.removeChild(this.preloader);
  }

  public resize(w: number, h: number): void {
    stageW = w;
    stageH = h;

    this.preloader.x = (stageW * 0.5) >> 0;
    this.preloader.y = (stageH * 0.5) >> 0;

    if (stageW < MEDIA_SM_WIDTH) {
      this.title.x = 15;
      this.title.y = 15;

      this.title.scaleX = this.title.scaleY = 0.5;
    } else {
      this.title.x = 30;
      this.title.y = 30;

      this.title.scaleX = this.title.scaleY = 1.0;
    }
  }
}
