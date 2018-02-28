import RulerYear = lib.RulerYear;
import { MAX_YEAR_NUM } from './AppConst';

'use strict';

export class YearScrollbar extends createjs.Container {
  public onChange: Function;

  private minItemId: number = 0;
  private maxItemId: number = MAX_YEAR_NUM;
  private minX: number = 0;
  private maxX: number = 0;
  private maxValue: number = MAX_YEAR_NUM;

  private _thumb: createjs.Container;
  private _bg: createjs.Container;
  private _value: number;
  private _asset: lib.YearScollbarAsset;
  private _targetX: number = 0;

  public getValue(): number {
    return this._value;
  }

  constructor() {
    super();

    this._asset = new lib.YearScollbarAsset();
    this.cursor = 'pointer';
    this.addChild(this._asset);

    for (let i = this.minItemId; i <= this.maxItemId; i++) {
      let mc: RulerYear = <RulerYear>this._asset['year_' + i];
      mc.mouseEnabled = false;
    }

    this.minX = (<RulerYear>this._asset['year_' + this.minItemId]).x;
    this.maxX = (<RulerYear>this._asset['year_' + this.maxItemId]).x;
    this._value = this.maxValue;

    this._thumb = this._asset.thumb;
    this._thumb.on('mousedown', (event: createjs.MouseEvent) => {
      this.startDrag(event);
    });

    // 背景をタップしてもThumbが移動するように設定
    this._bg = this._asset['scrollBg'];
    this._bg.on('click', (event: createjs.MouseEvent) => {
      let local: createjs.Point = this.globalToLocal(
        event.stageX,
        event.stageY
      );

      let valueX: number = local.x;
      let a: number = valueX - this.minX;
      let b: number = this.maxX - this.minX;
      let step: number = b / this.maxItemId;

      let value: number = Math.round(a / step);

      this._targetX = step * value + this.minX;
      this.moveThumb(this._targetX);

      this.commitProperties();
    });
  }

  private commitProperties(): void {
    // 上のコードと同じもの
    let old: number = this._value;
    this._value = this.searchValue(this._targetX);
    this._value = Math.max(this._value, 0);
    this._value = Math.min(this._value, this.maxValue);

    if (old != this._value) if (this.onChange) this.onChange();
  }

  private searchValue(valueX: number): number {
    let a: number = valueX - this.minX;
    let b: number = this.maxX - this.minX;
    let step: number = b / this.maxItemId;

    let value = Math.round(a / step);

    return value;
  }

  private searchNearPosition(valueX: number): number {
    let a: number = valueX - this.minX;
    let b: number = this.maxX - this.minX;
    let step: number = b / this.maxItemId;
    let pos: number = Math.round(a / step) * step;

    pos += this.minX;

    if (this.minX > pos) pos = this.minX;
    if (this.maxX < pos) pos = this.maxX;

    return pos;
  }

  private startDrag(event: createjs.MouseEvent): void {
    this._thumb.addEventListener('pressmove', (event: createjs.MouseEvent) => {
      this.drag(event);
    });
    this._thumb.addEventListener('pressup', (event: createjs.MouseEvent) => {
      this.stopDrag(event);
    });
  }

  private drag(event: createjs.MouseEvent): void {
    let point: createjs.Point = this._asset.globalToLocal(
      event.stageX,
      event.stageY
    );
    this._targetX = this.searchNearPosition(point.x);
    this.moveThumb(this._targetX);
    this.commitProperties();
  }

  private stopDrag(event: createjs.MouseEvent): void {
    this._thumb.removeAllEventListeners('pressmove');
    this._thumb.removeAllEventListeners('pressup');

    let point: createjs.Point = this._asset.globalToLocal(
      event.stageX,
      event.stageY
    );
    this._targetX = this.searchNearPosition(point.x);
    this.moveThumb(this._targetX);
  }

  private moveThumb(value: number): void {
    createjs.Tween.get(this._thumb, { override: true }).to(
      { x: value },
      300,
      createjs.Ease.cubicOut
    );
  }
}
