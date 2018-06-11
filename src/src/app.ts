import {
  SOUND_CLICK,
  SOUND_CLICK_ID,
  SOUND_MOUSE_OVER,
  SOUND_MOUSE_OVER_ID,
} from './AppConst';
import { FrontView } from './FrontView';
import { MainView } from './MainView';
import { SocialButtonBuilder } from './SocialButtonBuilder';

declare var images: any;

import LoadItem = createjs.LoadItem;

let canvas: HTMLCanvasElement;
let stage: createjs.Stage;
let mainView: MainView;
let frontView: FrontView;

window.addEventListener('DOMContentLoaded', () => {
  init();
});

export class Main {}
export function init(): void {
  initStage();
  startLoad();
}

function initStage(): void {
  // CreateJSの初期化
  canvas = <HTMLCanvasElement>document.getElementById('mainCanvas');
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver(30);
  createjs.MotionGuidePlugin.install();

  // enable touch action
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }

  // エンターフレームの登録
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener('tick', (e: createjs.Event) => {
    handleTick(e);
  });

  // ロゴとか表示
  frontView = new FrontView();
  frontView.init();
  stage.addChild(frontView);
  resize();

  // リサイズイベントのハンドル
  window.addEventListener('resize', (event) => {
    resize();
  });
}

function startLoad(): void {
  // 音の定義
  createjs.Sound.registerPlugins([
    createjs.WebAudioPlugin,
    createjs.HTMLAudioPlugin,
  ]);
  createjs.Sound.alternateExtensions = ['mp3'];
  createjs.Sound.registerSound(SOUND_MOUSE_OVER, SOUND_MOUSE_OVER_ID);
  createjs.Sound.registerSound(SOUND_CLICK, SOUND_CLICK_ID);

  // 先読み
  const queue: createjs.LoadQueue = new createjs.LoadQueue(false);
  queue.setMaxConnections(6);
  queue.on('fileload', (event: any) => {
    const item: any = event['item'];
    if (item.type == createjs.AbstractLoader.IMAGE) {
      images[item.id] = event['result'];
    } else if (item.type == createjs.AbstractLoader.CSS) {
      (document.head || document.getElementsByTagName('head')[0]).appendChild(
        event['result']
      );
    }
  });

  queue.on('complete', handleComplete);
  queue.loadManifest([
    {
      src: 'http://fonts.googleapis.com/css?family=Titillium+Web:400,200',
      id: 'font',
      type: createjs.LoadQueue.CSS,
    },
  ]);
}

function handleComplete(): void {
  // コンテンツの作成
  mainView = new MainView();
  stage.addChildAt(mainView, 0);

  mainView.init();

  // 一回目が再生されないのでダミー
  createjs.Sound.play(SOUND_MOUSE_OVER_ID, null, 0, 0, 0, 0);
  createjs.Sound.play(SOUND_CLICK_ID, null, 0, 0, 0, 0);

  frontView.complete();

  resize();

  // 演出開始
  mainView.showAllJapanMap();

  // さらに遅延させてソーシャルボタンを構築
  setTimeout(() => {
    // SocialButtonBuilder.initialize();

    resize();
  }, 1000);
}

function resize(): void {
  let dpi = window.devicePixelRatio || 1.0;

  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;

  canvas.style.width = `100%`;
  canvas.style.height = `100%`;

  stage.scaleX = stage.scaleY = dpi;

  if (mainView) mainView.resize(innerWidth, innerHeight);
  if (frontView) frontView.resize(innerWidth, innerHeight);
}

function handleTick(event: createjs.Event): void {
  if (mainView) mainView.update();
  stage.update();
}
