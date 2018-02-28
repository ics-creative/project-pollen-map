import {
  getPrefData,
  MEDIA_SM_WIDTH,
  PEFF_LIST,
  SOUND_CLICK_ID,
} from './AppConst';
import { ArrowButton } from './ArrowButton';
import { GraphPopup } from './GraphPopup';
import { PrefDetailItemView } from './PrefDetailItemView';
import { Tails } from './Tails';
import { YearScrollbar } from './YearScrollbar';
import PrefItem = lib.PrefItem;

let stageW: number = 960;
let stageH: number = 540;

export class MainView extends createjs.Container {
  private containerMap: createjs.MovieClip;
  private containerPref: createjs.Container;
  private mapObjectList: createjs.Shape[] = [];
  private currentIndex: number = 0;
  private oldIndex: number = 0;
  private tails: Tails;
  private btnNext: createjs.Container;
  private btnPrev: createjs.Container;
  private btnBack: createjs.Container;
  private bmpShadow: createjs.Bitmap;
  private shapeOutline: createjs.Shape;
  private debugShape: createjs.Shape;
  private scrollbar: YearScrollbar;
  private prefList: PrefDetailItemView[] = [];
  private graffPopup: GraphPopup;

  private isAllMap: boolean;
  private timerPoint: number;
  private timerDetail: number;
  private currentShowItems: createjs.DisplayObject[] = [];

  public init(): void {
    // -------------------------------------
    // map
    // -------------------------------------

    // Map
    this.containerMap = new window['lib'].MapAsset();
    this.addChild(this.containerMap);

    this.debugShape = new createjs.Shape();
    this.debugShape.visible = false;
    this.containerMap.addChild(this.debugShape);

    // Dot BG
    let bg: createjs.Bitmap = new createjs.Bitmap(
      window['images']['DotBgImage']
    );
    bg.mouseEnabled = false;
    bg.visible = true;
    this.addChild(bg);

    this.bmpShadow = new createjs.Bitmap(window['images']['Shadow']);
    this.bmpShadow.mouseEnabled = false;
    this.bmpShadow.visible = true;
    this.addChild(this.bmpShadow);

    // Tails
    this.tails = new Tails();
    this.tails.init();
    this.containerMap.addChild(this.tails);

    // 47都道府県に北海道地区を2地区追加
    for (let i = 1; i <= 49; i++) {
      let shape: createjs.Shape = new createjs.Shape();
      shape.graphics.beginFill('#EEE').drawRect(-16, -16, 32, 32);

      if (this.containerMap['item_' + i]) {
        let item: PrefItem = this.containerMap['item_' + i];
        shape.x = <number>item.x;
        shape.y = <number>item.y;
      }

      shape.alpha = 0; // 初期値
      shape.scaleX = 0;
      shape.scaleY = 0;
      this.mapObjectList[i] = shape; // [注意] 0は欠番
      this.containerMap.addChild(shape);
    }

    this.containerPref = new createjs.Container();
    this.addChild(this.containerPref);

    // -------------------------------------
    // title
    // -------------------------------------

    this.shapeOutline = new createjs.Shape();
    this.addChild(this.shapeOutline);

    // -------------------------------------
    // ui
    // -------------------------------------

    let btnBack = new window['lib'].BtnBackAsset();
    btnBack.cursor = 'pointer';
    btnBack.x = 20;
    btnBack.y = 100;
    this.addChild(btnBack);

    let btnArrow = new ArrowButton(btnBack, 0);
    btnBack.addEventListener('click', (event) => {
      this.showAllJapanMap();
    });

    this.btnBack = btnBack;

    let btnNext = new window['lib'].BtnNextAsset();
    btnNext.cursor = 'pointer';
    new ArrowButton(btnNext, +5);

    btnNext.addEventListener('click', (event) => {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = PEFF_LIST.main.length - 1;
      }
      if (this.isAllMap) {
        this.currentIndex = PEFF_LIST.main.length - 1;
      }
      this.showDetailView();
    });
    this.addChild(btnNext);
    this.btnNext = btnNext;

    let btnPrev = new window['lib'].BtnPrevAsset();
    btnPrev.cursor = 'pointer';
    new ArrowButton(btnPrev, -5);

    btnPrev.addEventListener('click', (event) => {
      this.currentIndex++;
      if (this.currentIndex > PEFF_LIST.main.length - 1) {
        this.currentIndex = 0;
      }
      if (this.isAllMap) this.currentIndex = 0;
      this.showDetailView();
    });

    this.addChild(btnPrev);
    this.btnPrev = btnPrev;

    btnBack.visible = btnNext.visible = btnPrev.visible = false;

    // Scrollbar

    this.scrollbar = new YearScrollbar();
    this.scrollbar.onChange = () => {
      for (let i = 0; i < this.prefList.length; i++) {
        let detail: PrefDetailItemView = this.prefList[i];
        detail.changeYear(this.scrollbar.getValue());
      }
    };

    this.scrollbar.visible = true;
    this.addChild(this.scrollbar);

    // Popup
    this.graffPopup = new GraphPopup();
    this.addChild(this.graffPopup);
  }

  /** 地域を表示 */
  private showDetailView() {
    this.btnBack.visible = false;
    this.btnNext.visible = this.btnPrev.visible = true;

    let areaArr: any[] = PEFF_LIST['area_' + PEFF_LIST.main[this.currentIndex]];

    this.isAllMap = false;
    this.showPrefObjectsCore(areaArr);

    let prefId: number = PEFF_LIST.main[this.currentIndex];
    let areaList: number[] = PEFF_LIST['area_' + prefId];

    // ---------------------------------------
    // 領域の計算
    // ---------------------------------------
    let positions = this.getNextAreaPositions(areaList);

    let maxRect = {
      top: 6800,
      bottom: -9999999,
      left: 6800,
      right: -9999999,
    }; // 最大幅(適当)
    for (let i = 0; i < positions.length; i++) {
      let dx: number = positions[i].x;
      let dy: number = positions[i].y;

      if (maxRect.left > dx) maxRect.left = dx;
      if (maxRect.right < dx) maxRect.right = dx;
      if (maxRect.top > dy) maxRect.top = dy;
      if (maxRect.bottom < dy) maxRect.bottom = dy;
    }

    // マージンの追加
    maxRect.left -= 100;
    maxRect.right += 100;
    maxRect.top -= 100;
    maxRect.bottom += 200;

    let rectW: number = Math.abs(maxRect.right - maxRect.left);
    let rectH: number = Math.abs(maxRect.bottom - maxRect.top);

    let rectScaleW: number = stageW / rectW; // 6800
    let rectScaleH: number = stageH / rectH; // 6925

    let scale: number = Math.min(rectScaleW, rectScaleH);

    let centerX: number = (maxRect.right + maxRect.left) / 2;
    let centerY: number = (maxRect.bottom + maxRect.top) / 2;

    this.debugShape.graphics
      .clear()
      .setStrokeStyle(1)
      .beginStroke('rgba(255,0,0,0.25)')
      .drawRect(maxRect.left, maxRect.top, rectW, rectH);

    // ---------------------------------------
    // マップの移動
    // ---------------------------------------

    createjs.Tween.get(this.containerMap, { override: true })
      .wait(350)
      .to(
        {
          regX: centerX,
          regY: centerY,
          scaleX: scale,
          scaleY: scale,
        },
        1700,
        createjs.Ease.getPowOut(4)
      )
      .call(() => {
        // 戻るボタンのバグがあるので、ここで有効化
        this.btnBack.visible = true;
      });

    this.oldIndex = this.currentIndex;
  }

  private showPrefObjectsCore(areaArr: number[]): void {
    let frame: number = 33;

    let prefId: number = PEFF_LIST.main[this.currentIndex];
    let areaList: number[] = PEFF_LIST['area_' + prefId];
    let positions = this.getNextAreaPositions(areaList);

    // 詳細表示をリセット
    this.hideDetailViews();

    // ---------------------------------------
    //
    // ---------------------------------------

    for (let i = 0; i < this.currentShowItems.length; i++) {
      createjs.Tween.get(this.currentShowItems[i], { override: true })
        .to({ scaleX: 0.5, scaleY: 0.5, alpha: 1 }, 0)
        .wait(Math.random() * 100)
        .to({ alpha: 0 }, frame)
        .to({ alpha: 1 }, frame)
        .wait(frame)
        .to({ alpha: 0 }, frame)
        .to({ alpha: 1 }, frame)
        .wait(frame)
        .wait(frame)
        .to({ scaleX: 0, scaleY: 0, alpha: 1 }, 250, createjs.Ease.cubicIn);
    }

    // ---------------------------------------
    //
    // ---------------------------------------

    for (let i = 0; i < areaArr.length; i++) {
      let target: createjs.DisplayObject = this.mapObjectList[areaArr[i]];

      createjs.Tween.get(target, { override: true })
        .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 0)
        .wait(500 + Math.random() * 200)
        .to({ scaleX: 0.5, scaleY: 0.5 }, 1000, createjs.Ease.elasticOut)
        .to({ alpha: 0 }, frame)
        .wait(frame)
        .to({ alpha: 1 }, frame)
        .wait(frame)
        .to({ alpha: 0 }, frame)
        .to({ alpha: 1 }, frame)
        .wait(frame)
        .to({ alpha: 0 }, frame)
        .to({ alpha: 1 }, frame)
        .to(
          { scaleX: 2.5, scaleY: 2.0, alpha: 0 },
          300,
          createjs.Ease.cubicOut
        );

      this.currentShowItems.push(target);
    }

    // TODO、中断処理が必要 -> いれた
    if (this.timerPoint) clearTimeout(this.timerPoint);
    if (this.timerDetail) clearTimeout(this.timerDetail);
    this.timerPoint = window.setTimeout(() => {
      this.tails.setPoint(positions);
    }, 300);
    this.timerDetail = window.setTimeout(() => {
      this.showDetailViews();
    }, 1700);
  }

  /** 日本全国を表示 */
  public showAllJapanMap(): void {
    // 遷移用ボタンは非表示にする
    this.btnBack.visible = this.btnNext.visible = this.btnPrev.visible = false;

    let areaArr: any[] = PEFF_LIST.main;

    this.isAllMap = true;
    this.showPrefObjectsCore(areaArr);
    let scaleX: number = stageW / 6800;
    let scaleY: number = stageH / 6925;
    let scale: number = Math.min(scaleX, scaleY);

    createjs.Tween.get(this.containerMap).to(
      {
        regX: 0,
        regY: -550,
        scaleX: scale,
        scaleY: scale,
      },
      1250,
      createjs.Ease.cubicInOut
    );
  }

  private OFFSET_POSITION: any[] = [
    { x: 130, y: 30 }, // Hokkaido
    { x: 80, y: 0 }, // Miyagi
    { x: 110, y: 40 }, // Tokyo
    { x: -70, y: -60 }, // Nigata
    { x: 0, y: 0 }, // Aichi
    { x: -140, y: -30 }, // Osaka
    { x: -230, y: -60 }, // Hiroshima
    { x: 50, y: 70 }, // Ehime
    { x: -80, y: 60 }, // Fukuoka
  ];

  /** 都道府県別の詳細を表示 */
  showDetailViews() {
    let areaList: number[];
    if (this.isAllMap) areaList = PEFF_LIST['main'];
    else {
      areaList = PEFF_LIST['area_' + PEFF_LIST.main[this.currentIndex]];
    }

    let positions = this.getNextAreaPositions(areaList);

    for (let i = 0; i < positions.length; i++) {
      let targetObj: any = positions[i];

      let point: createjs.Point = this.containerMap.localToLocal(
        targetObj.x,
        targetObj.y,
        this
      );

      let detail = new PrefDetailItemView(targetObj.itemId);

      // 全体マップの時
      if (this.isAllMap == true) {
        detail.x = point.x + this.OFFSET_POSITION[i].x;
        detail.y = point.y + this.OFFSET_POSITION[i].y;
        detail.scaleX = detail.scaleY =
          Math.min(stageW / 800, stageH / 1000, 1.0) * 0.7;
        detail.areaId = i;

        detail.on('click', (event: createjs.MouseEvent) => {
          let t = <PrefDetailItemView>event.currentTarget;
          this.currentIndex = t.areaId;
          this.showDetailView();
          createjs.Sound.play(SOUND_CLICK_ID, createjs.Sound.INTERRUPT_ANY);
        });
      } else {
        // 詳細マップの時
        detail.x = point.x;
        detail.y = point.y;
        detail.scaleX = detail.scaleY = Math.min(
          stageW / 800,
          stageH / 1000,
          1.0
        );

        detail.on('click', (event: createjs.MouseEvent) => {
          let t = <PrefDetailItemView>event.currentTarget;
          createjs.Sound.play(SOUND_CLICK_ID, createjs.Sound.INTERRUPT_ANY);
          this.showPopup(t.itemId);
        });
      }
      detail.changeYear(this.scrollbar.getValue());
      detail.show(100 * i);
      this.containerPref.addChild(detail);
      this.prefList.push(detail);
    }
  }

  private getNextAreaPositions(
    areaList: number[]
  ): { x: number; y: number; itemId: number }[] {
    let arr: any[] = [];

    let len: number = areaList.length;

    for (let i = 0; i < len; i++) {
      let itemId: number = areaList[i];
      let targetObj: createjs.DisplayObject = <createjs.DisplayObject>this
        .containerMap['item_' + itemId];

      arr[i] = { x: targetObj.x, y: targetObj.y, itemId: itemId };
    }

    return arr;
  }

  hideDetailViews(): void {
    for (let i = 0; i < this.prefList.length; i++) {
      // this.containerMap.removeChild(this.prefList[i]);

      let detail: PrefDetailItemView = this.prefList[i];
      detail.removeAllEventListeners(); // 全部イベントを解除
      detail.dispose();
      this.containerPref.removeChild(detail);
    }

    this.prefList = [];
  }

  public update(): void {
    this.tails.update();
  }

  public resize(w: number, h: number): void {
    let prevW = stageW;
    let prevH = stageH;
    const isSmView = stageW < MEDIA_SM_WIDTH;

    stageW = w;
    stageH = h;

    // 詳細位置調整
    for (let i = 0; i < this.prefList.length; i++) {
      let detail: PrefDetailItemView = this.prefList[i];
      detail.x += (stageW - prevW) * 0.5;
      detail.y += (stageH - prevH) * 0.5;
    }

    this.btnNext.y = stageH / 2;
    this.btnPrev.y = stageH / 2;

    if (isSmView == true) {
      this.btnBack.x = 15;
      this.btnBack.y = 50;
      this.btnBack.scaleX = this.btnBack.scaleY = 0.75;
      this.btnNext.scaleX = this.btnNext.scaleY = 0.5;
      this.btnPrev.scaleX = this.btnPrev.scaleY = 0.5;
      this.btnNext.x = stageW - 30;
      this.btnPrev.x = 30;
    } else {
      this.btnBack.x = stageW - 200;
      this.btnBack.y = 25;
      this.btnBack.scaleX = this.btnBack.scaleY = 1.0;
      this.btnNext.scaleX = this.btnNext.scaleY = 1.0;
      this.btnPrev.scaleX = this.btnPrev.scaleY = 1.0;
      this.btnNext.x = stageW - 60;
      this.btnPrev.x = 60;
    }

    this.containerMap.x = stageW / 2;
    this.containerMap.y = stageH / 2;

    this.bmpShadow.scaleX = stageW / 1024;
    this.bmpShadow.scaleY = stageH / 1024;

    if (isSmView) {
      const scale = stageW / this.scrollbar.getBounds().width;
      this.scrollbar.scaleX = this.scrollbar.scaleY = scale;

      this.scrollbar.x = 0; // 少し左に寄せる
      this.scrollbar.y =
        stageH - this.scrollbar.getBounds().height * scale - 40;
    } else {
      this.scrollbar.x = stageW * 0.5 - 680 / 2 - 50; // 少し左に寄せる
      this.scrollbar.y = stageH - 70;
      this.scrollbar.scaleX = this.scrollbar.scaleY = 1.0;
    }

    this.graffPopup.x = w / 2;
    this.graffPopup.y = h / 2;
    this.graffPopup.resize(w, h);
  }

  private showPopup(itemId: number): void {
    this.graffPopup.setGraphData(getPrefData(itemId));
    this.graffPopup.show();
  }
}
