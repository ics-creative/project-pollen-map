declare namespace lib {
  export class properties implements Object {
    static width: number;
    static height: number;
    static fps: number;
    static color: string;
    static manifest: Object[];
  }

  export class DetailBackground_bmp extends createjs.Bitmap {
    static nominalBounds: createjs.Rectangle;
  }

  export class Tree_bmp extends createjs.Bitmap {
    static nominalBounds: createjs.Rectangle;
  }

  export class YearScrollbarBg extends createjs.MovieClip {
    shape: createjs.Shape;
    shape_1: createjs.Shape;
    shape_2: createjs.Shape;
    shape_3: createjs.Shape;
    shape_4: createjs.Shape;
    shape_5: createjs.Shape;
    shape_6: createjs.Shape;
    shape_7: createjs.Shape;
    shape_8: createjs.Shape;
    shape_9: createjs.Shape;
    shape_10: createjs.Shape;
    shape_11: createjs.Shape;
    shape_12: createjs.Shape;
    shape_13: createjs.Shape;
    shape_14: createjs.Shape;
    shape_15: createjs.Shape;
    shape_16: createjs.Shape;
    shape_17: createjs.Shape;
    shape_18: createjs.Shape;
    shape_19: createjs.Shape;
    shape_20: createjs.Shape;
    shape_21: createjs.Shape;
    shape_22: createjs.Shape;
    shape_23: createjs.Shape;
    shape_24: createjs.Shape;
    shape_25: createjs.Shape;
    shape_26: createjs.Shape;
    shape_27: createjs.Shape;
    shape_28: createjs.Shape;
    shape_29: createjs.Shape;
    shape_30: createjs.Shape;
    shape_31: createjs.Shape;
    shape_32: createjs.Shape;
    shape_33: createjs.Shape;
    shape_34: createjs.Shape;
    shape_35: createjs.Shape;
    shape_36: createjs.Shape;
    shape_37: createjs.Shape;
    shape_38: createjs.Shape;
    shape_39: createjs.Shape;
    shape_40: createjs.Shape;
    shape_41: createjs.Shape;
    shape_42: createjs.Shape;
    shape_43: createjs.Shape;
    shape_44: createjs.Shape;
    shape_45: createjs.Shape;
    shape_46: createjs.Shape;
    shape_47: createjs.Shape;
    shape_48: createjs.Shape;
    shape_49: createjs.Shape;
  }

  export class WhiteRect2 extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class WhiteRect extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class Thumb extends createjs.MovieClip {
    shape: createjs.Shape;
    shape_1: createjs.Shape;
    shape_2: createjs.Shape;
  }

  export class RulerYear extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class PrefItem extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class Tree extends createjs.MovieClip {
    instance: Tree_bmp;
  }

  export class DetailBackground extends createjs.MovieClip {
    instance: DetailBackground_bmp;
  }

  export class MapSymbol extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class Empty extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class BtnNextBg extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class BtnCloseGrafic extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class BtnBackBg extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class ArrowBack extends createjs.MovieClip {
    shape: createjs.Shape;
    shape_1: createjs.Shape;
    shape_2: createjs.Shape;
  }

  export class Arrow extends createjs.MovieClip {
    shape: createjs.Shape;
  }

  export class YearScollbarAsset extends createjs.MovieClip {
    thumb: Thumb;
    year_11: RulerYear;
    year_10: RulerYear;
    year_9: RulerYear;
    year_8: RulerYear;
    year_7: RulerYear;
    year_6: RulerYear;
    year_5: RulerYear;
    year_4: RulerYear;
    year_3: RulerYear;
    year_2: RulerYear;
    year_1: RulerYear;
    year_0: RulerYear;
    scrollBg: YearScrollbarBg;
  }

  export class MapAsset extends createjs.MovieClip {
    item_47: PrefItem;
    item_46: PrefItem;
    item_45: PrefItem;
    item_44: PrefItem;
    item_43: PrefItem;
    item_42: PrefItem;
    item_41: PrefItem;
    item_40: PrefItem;
    item_39: PrefItem;
    item_38: PrefItem;
    item_37: PrefItem;
    item_36: PrefItem;
    item_35: PrefItem;
    item_34: PrefItem;
    item_33: PrefItem;
    item_32: PrefItem;
    item_31: PrefItem;
    item_30: PrefItem;
    item_29: PrefItem;
    item_28: PrefItem;
    item_27: PrefItem;
    item_26: PrefItem;
    item_25: PrefItem;
    item_24: PrefItem;
    item_23: PrefItem;
    item_22: PrefItem;
    item_21: PrefItem;
    item_20: PrefItem;
    item_19: PrefItem;
    item_18: PrefItem;
    item_17: PrefItem;
    item_16: PrefItem;
    item_15: PrefItem;
    item_14: PrefItem;
    item_13: PrefItem;
    item_12: PrefItem;
    item_11: PrefItem;
    item_10: PrefItem;
    item_9: PrefItem;
    item_8: PrefItem;
    item_7: PrefItem;
    item_6: PrefItem;
    item_5: PrefItem;
    item_4: PrefItem;
    item_3: PrefItem;
    item_2: PrefItem;
    item_49: PrefItem;
    item_48: PrefItem;
    item_1: PrefItem;
    map: MapSymbol;
  }

  export class BtnPrevAsset extends createjs.MovieClip {
    arrow: Arrow;
    rect: WhiteRect;
    base: BtnNextBg;
  }

  export class BtnNextAsset extends createjs.MovieClip {
    arrow: Arrow;
    rect: WhiteRect;
    base: BtnNextBg;
  }

  export class BtnClose extends createjs.MovieClip {
    arrow: BtnCloseGrafic;
    rect: WhiteRect;
    base: BtnNextBg;
  }

  export class BtnBackAsset extends createjs.MovieClip {
    arrow: ArrowBack;
    shape: createjs.Shape;
    shape_1: createjs.Shape;
    shape_2: createjs.Shape;
    shape_3: createjs.Shape;
    shape_4: createjs.Shape;
    shape_5: createjs.Shape;
    shape_6: createjs.Shape;
    shape_7: createjs.Shape;
    shape_8: createjs.Shape;
    shape_9: createjs.Shape;
    shape_10: createjs.Shape;
    shape_11: createjs.Shape;
    rect: WhiteRect2;
    base: BtnBackBg;
  }

  export class PollenGraffAsset extends createjs.MovieClip {
    container: Empty;
    shape: createjs.Shape;
    shape_1: createjs.Shape;
    shape_2: createjs.Shape;
    shape_3: createjs.Shape;
    shape_4: createjs.Shape;
    shape_5: createjs.Shape;
    shape_6: createjs.Shape;
    shape_7: createjs.Shape;
    shape_8: createjs.Shape;
    shape_9: createjs.Shape;
    shape_10: createjs.Shape;
    shape_11: createjs.Shape;
    shape_12: createjs.Shape;
    shape_13: createjs.Shape;
    shape_14: createjs.Shape;
    shape_15: createjs.Shape;
    shape_16: createjs.Shape;
    shape_17: createjs.Shape;
    shape_18: createjs.Shape;
    btnClose: BtnClose;
    shape_19: createjs.Shape;
  }

  export class JapanAsset extends createjs.MovieClip {
    instance: Tree;
    instance_1: DetailBackground;
    instance_2: BtnBackAsset;
    instance_3: YearScollbarAsset;
    instance_4: BtnPrevAsset;
    instance_5: BtnNextAsset;
    instance_6: MapAsset;
    instance_7: PollenGraffAsset;
  }
}
