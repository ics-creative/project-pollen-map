import { SOUND_CLICK_ID, SOUND_MOUSE_OVER_ID } from './AppConst';

export class ArrowButton {
  private instance: createjs.Container;
  private baseX: number;
  private targetX: number;

  constructor($instance: createjs.Container, direction: number) {
    this.instance = $instance;

    let base = this.instance['base'];
    let rect = this.instance['rect'];
    let arrow = this.instance['arrow'];

    this.baseX = arrow.x;
    this.targetX = this.baseX + direction;
    this.instance.cursor = 'pointer';
    rect.alpha = 0;

    this.instance.on('rollover', (event) => {
      createjs.Tween.get(arrow, { override: true }).to(
        { x: this.targetX },
        250,
        createjs.Ease.cubicOut
      );
      createjs.Tween.get(rect, { override: true })
        .to({ alpha: 0.6 }, 100, createjs.Ease.cubicIn)
        .to({ alpha: 0.05 }, 100, createjs.Ease.cubicOut);

      createjs.Sound.play(SOUND_MOUSE_OVER_ID, createjs.Sound.INTERRUPT_ANY);
    });

    this.instance.on('rollout', (event) => {
      createjs.Tween.get(arrow, { override: true }).to(
        { x: this.baseX },
        250,
        createjs.Ease.cubicOut
      );
      createjs.Tween.get(rect, { override: true }).to(
        { alpha: 0 },
        250,
        createjs.Ease.cubicOut
      );
    });

    this.instance.on('press', (event: createjs.MouseEvent) => {
      createjs.Tween.get(this.instance, { override: true }).to(
        { alpha: 0.5 },
        250,
        createjs.Ease.cubicOut
      );
    });

    this.instance.on('click', (event: createjs.MouseEvent) => {
      createjs.Sound.play(SOUND_CLICK_ID, createjs.Sound.INTERRUPT_ANY);
    });
  }
}
