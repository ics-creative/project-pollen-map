import { BASE_YEAR, FONT_NAME, MEDIA_SM_WIDTH } from './AppConst';
import { ArrowButton } from './ArrowButton';
import { ShuffleEaselText } from './ShuffleEaselText';

export class GraphPopup extends createjs.Container {
  private VIEW_W: number = 760;
  private VIEW_H: number = 340;

  private _shapeLines: createjs.Shape;
  private _shapeValues: createjs.Shape;
  private _zabuton: createjs.Shape;
  private _asset: lib.PollenGraffAsset;
  private _dots: createjs.Shape[];
  private _label: ShuffleEaselText;

  constructor() {
    super();
    this._zabuton = new createjs.Shape();
    this._zabuton.mouseEnabled = true;
    this._zabuton.on('click', (event: createjs.MouseEvent) => {
      event.preventDefault();
    });
    this.addChild(this._zabuton);

    this._shapeLines = new createjs.Shape();
    this._shapeValues = new createjs.Shape();
    this._asset = new lib.PollenGraffAsset();
    this._asset.regX = this._asset.getBounds().width / 2;
    this._asset.regY = this._asset.getBounds().height / 2;

    this.addChild(this._asset);

    let btnClose = new ArrowButton(this._asset.btnClose, 0);
    this._asset.btnClose.on('click', this.handleClickClose, this);

    this._label = new ShuffleEaselText(null, 24 + 'px ' + FONT_NAME, 'white');
    this._label.x = 20;
    this._label.y = 5;
    this._label.duration = 300;
    this._label.mouseEnabled = false;
    this._asset.addChild(this._label);

    this.hide(true);
  }

  public setGraphData(graphData: GraphData): void {
    this._asset.container.removeAllChildren();
    this._asset.container.addChild(this._shapeLines);
    this._asset.container.addChild(this._shapeValues);

    let graffMaxValue = Math.max(...graphData.pollen);
    let graffMaxValueCell = Math.ceil(graffMaxValue / 1000) * 1000;

    this._label.setText(`POLLEN AMOUNT GRAPH IN ${graphData.name}`);
    this._label.start();

    const g = this._shapeLines.graphics;
    g
      .clear()
      .beginStroke('#666666')
      .setStrokeStyle(2)
      .setStrokeDash([4, 2]);

    for (let i = 0; i <= 4; i++) {
      const gx = this.VIEW_W * (i / graphData.pollen.length);
      const gy = this.VIEW_H * (1 - i / 4);

      g.moveTo(0, gy);
      g.lineTo(this.VIEW_W, gy);

      let label = graffMaxValueCell * i / 4;
      label = Math.round(label / 50) * 50;

      let tf = new createjs.Text(String(label), '12px ' + FONT_NAME, '#999');
      tf.textAlign = 'right';
      tf.textBaseline = 'middle';
      tf.x = -10;
      tf.y = gy;
      this._asset.container.addChild(tf);

      let tfRight = tf.clone();
      tfRight.textAlign = 'left';
      tfRight.x = this.VIEW_W + 10;
      this._asset.container.addChild(tfRight);
    }
    // 年号
    for (let i = 0; i < graphData.pollen.length; i++) {
      const gx = this.VIEW_W * (i / (graphData.pollen.length - 1));
      const gy = this.VIEW_H;

      let label = BASE_YEAR + i;

      let tf = new createjs.Text(String(label), '12px ' + FONT_NAME, '#CCC');
      tf.textAlign = 'center';
      tf.textBaseline = 'top';
      tf.x = gx;
      tf.y = gy + 20;
      this._asset.container.addChild(tf);
    }

    this._dots = [];

    const timeline = new createjs.Timeline();

    for (let i = 0; i < graphData.pollen.length; i++) {
      let valueAbs = graphData.pollen[i];
      let relativeValue = valueAbs / graffMaxValueCell;

      // 先頭が最新のデータ・・・
      const indexPercent = 1 - i / (graphData.pollen.length - 1);
      const gx = this.VIEW_W * indexPercent;
      const gy = this.VIEW_H * (1.0 - relativeValue);

      let dot = new createjs.Shape();
      let hue = Math.min(valueAbs / 15000, 1.0) * -100 + 100;
      dot.graphics
        .beginFill(createjs.Graphics.getHSL(hue, 70, 50, 0.5))
        .drawCircle(0, 0, 16)
        .endFill();
      dot.graphics
        .beginFill(createjs.Graphics.getHSL(hue, 70, 50))
        .drawCircle(0, 0, 8)
        .endFill();
      this._asset.container.addChild(dot);

      dot.x = gx;
      dot.y = this.VIEW_H;
      timeline.addTween(
        createjs.Tween.get(dot)
          .wait(indexPercent * 600 + 300)
          .to({ y: gy }, 500, createjs.Ease.cubicOut)
      );

      this._dots[i] = dot;
    }

    this._listenerTick = createjs.Ticker.on('tick', this.handleTick, this);
    timeline.on('change', () => {
      if (timeline.position == timeline.duration) {
        timeline.removeAllEventListeners('change');
        createjs.Ticker.off('tick', this._listenerTick);
      }
    });
  }

  private handleTick() {
    const g = this._shapeValues.graphics;

    g
      .clear()
      .beginStroke(createjs.Graphics.getHSL(50, 50, 80))
      .setStrokeStyle(2, 'round', 'round')
      .setStrokeDash([]);

    for (let i = 0; i < this._dots.length; i++) {
      let dot = this._dots[i];

      const gx = dot.x;
      const gy = dot.y;

      if (i == 0) g.moveTo(gx, gy);
      else g.lineTo(gx, gy);
    }

    console.log('draw');
  }

  private _baseScale: number = 1.0;
  public resize(w: number, h: number): void {
    this._zabuton.graphics
      .clear()
      .beginFill(`rgba(0, 0, 0, 0.75)`)
      .drawRect(-w / 2, -h / 2, w, h);

    if (w < MEDIA_SM_WIDTH) {
      this._baseScale = w / this._asset.getBounds().width;
    } else {
      this._baseScale = 1.0;
    }
  }

  private _listenerTick: Function;

  public show(): void {
    this.visible = true;

    this._asset.scaleX = this._baseScale * 0.9;
    this._asset.scaleY = this._baseScale * 0.9;
    this._asset.alpha = 0.0;

    createjs.Tween.get(this._asset).to(
      { scaleX: this._baseScale, scaleY: this._baseScale, alpha: 1.0 },
      600,
      createjs.Ease.cubicOut
    );
  }

  public hide(immediate: boolean = false): void {
    if (immediate) this.visible = false;
    else {
      createjs.Tween.get(this._asset)
        .to(
          {
            scaleX: this._baseScale * 0.95,
            scaleY: this._baseScale * 0.95,
            alpha: 0,
          },
          200,
          createjs.Ease.cubicOut
        )
        .call(() => {
          this.visible = false;
        });
    }
  }

  private handleClickClose(): void {
    this.hide(false);
  }
}
