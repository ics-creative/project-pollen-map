import {
  FONT_NAME,
  getPrefData,
  MAX_YEAR_NUM,
  SOUND_MOUSE_OVER_ID,
} from './AppConst';
import { PollenParticle } from './PollenParticle';
import { ShuffleEaselText } from './ShuffleEaselText';

/**
 * 都道府県別の花粉飛散状況のグラフです。
 */
export class PrefDetailItemView extends createjs.Container {
  static AREA_WIDTH: number = 260;
  static AREA_HEIGHT: number = 180;

  private container: createjs.Container;
  private bg: lib.DetailBackground;
  private title: ShuffleEaselText;
  private pollenText: ShuffleEaselText;
  private particle: PollenParticle;
  public bright: createjs.Shape;

  public itemId: number;
  private prefName: string;
  private yearIndex: number;
  private pollenIndex: number;
  private data: { name: string; itemId: number; pollen: Array<number> };
  private pollen: Array<number>;
  public areaId: number;

  constructor(itemId: number = 0) {
    super();

    this.itemId = itemId;
    this.data = getPrefData(itemId);
    this.prefName = this.data.name;
    this.pollen = this.data.pollen;

    let hitArea = new createjs.Shape();
    hitArea.graphics
      .beginFill('rgba(0,0,0,0.01)')
      .drawRect(-260 / 2, -180 / 2, 260, 180);
    this.addChild(hitArea);

    this.bg = new lib.DetailBackground();
    this.bg.mouseEnabled = false;

    this.container = new createjs.Container();
    this.container.x = -PrefDetailItemView.AREA_WIDTH * 0.5;
    this.container.y = -PrefDetailItemView.AREA_HEIGHT * 0.5;
    this.container.mouseEnabled = false;
    this.addChild(this.container);

    this.bright = new createjs.Shape();
    this.bright.graphics.beginFill('#fff');
    this.bright.graphics.drawRect(
      0,
      0,
      PrefDetailItemView.AREA_WIDTH,
      PrefDetailItemView.AREA_HEIGHT
    );
    this.bright.mouseEnabled = false;

    this.cursor = 'pointer';

    this.on('rollover', (event: createjs.MouseEvent) => {
      createjs.Tween.get(this.bright, { override: true })
        .to({ alpha: 1 }, 100, createjs.Ease.cubicIn)
        .to({ alpha: 0.1 }, 100, createjs.Ease.cubicOut);
      createjs.Sound.play(SOUND_MOUSE_OVER_ID, createjs.Sound.INTERRUPT_ANY);
    });

    this.on('rollout', (event: createjs.MouseEvent) => {
      createjs.Tween.get(this.bright, { override: true }).to(
        { alpha: 0 },
        250,
        createjs.Ease.cubicOut
      );
    });
  }

  public show(delay: number) {
    let wait: number = 40;
    let alpha: number = 0.7;

    this.container.addChild(this.bg);
    this.container.addChild(this.bright);

    createjs.Tween.get(this.container)
      .wait(delay)
      .call(() => {
        // createjs.Sound.play(project.SOUND_CLICK_ID, createjs.Sound.INTERRUPT_ANY);
      });

    createjs.Tween.get(this)
      .to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, 0)
      .wait(delay)
      .to(
        { alpha: 1, scaleX: this.scaleX, scaleY: this.scaleY },
        400,
        createjs.Ease.circOut
      )
      .wait(wait * 5)
      .call(() => {
        this.initParticle();
        this.initAsset();
      });

    createjs.Tween.get(this.bright)
      .to({ alpha: 0 }, 0)
      .wait(delay)
      .to({ alpha: alpha }, 0)
      .wait(wait)
      .to({ alpha: 0 }, 0)
      .wait(wait)
      .to({ alpha: alpha }, 0)
      .wait(wait)
      .to({ alpha: 0 }, 0)
      .wait(wait)
      .to({ alpha: alpha }, 0)
      .wait(wait)
      .to({ alpha: 0 }, 0);

    return this;
  }

  public changeYear(yearIndex: number) {
    this.yearIndex = MAX_YEAR_NUM - yearIndex;
    this.pollenIndex = this.pollen[this.yearIndex];

    if (this.pollenText) {
      if (this.pollenIndex) this.pollenText.setText(this.pollenIndex + '');
      else this.pollenText.setText('-');
      this.pollenText.start();
    }
    if (this.particle) {
      this.particle.changeIndex(this.pollenIndex);
    }

    let alpha: number = 0.2;
    createjs.Tween.get(this.bright)
      .wait(100)
      .to({ alpha: alpha }, 0)
      .to({ alpha: 0 }, 200);

    createjs.Sound.play(
      SOUND_MOUSE_OVER_ID,
      createjs.Sound.INTERRUPT_ANY,
      0,
      0,
      0,
      0.5
    );
  }

  public dispose() {
    this.container.removeAllChildren();
    this.removeAllChildren();
  }

  private initAsset() {
    let offsetX = 5;
    let offsetY = -35;

    this.title = this.createShuffleText(this.prefName, 20, '#fff');
    this.title.x = offsetX;
    this.title.y = PrefDetailItemView.AREA_HEIGHT + offsetY - 6;
    this.title.start();

    this.pollenText = this.createShuffleText(this.pollenIndex + '', 37, '#fff');
    this.pollenText.textAlign = 'right';
    this.pollenText.x = PrefDetailItemView.AREA_WIDTH - 31 - offsetX;
    this.pollenText.y = PrefDetailItemView.AREA_HEIGHT + offsetY - 15;
    if (!this.pollenIndex) this.pollenText.setText('-');
    this.pollenText.start();

    let cm2 = this.createShuffleText('/ cm2', 12, '#fff');
    cm2.textAlign = 'right';
    cm2.x = PrefDetailItemView.AREA_WIDTH - offsetX;
    cm2.y = PrefDetailItemView.AREA_HEIGHT + offsetY + 13;
    cm2.start();

    let desc = this.createShuffleText('amount of pollen in spring', 10, '#777');
    desc.x = offsetX;
    desc.y = PrefDetailItemView.AREA_HEIGHT + 18 + offsetY;
    desc.start();
  }

  private initParticle() {
    this.particle = new PollenParticle();
    this.particle.changeIndex(this.pollenIndex);
    this.particle.play();
    this.container.addChild(this.particle);
  }

  private createShuffleText(text: string, size: number, color: string) {
    let tf = new ShuffleEaselText(null, size + 'px ' + FONT_NAME, color);
    tf.setText(text);
    tf.mouseEnabled = false;
    this.container.addChild(tf);
    return tf;
  }
}
