import { PrefDetailItemView } from './PrefDetailItemView';

export class PollenParticle extends createjs.Container {
  static pool: Particle[] = [];

  AREA_WIDTH: number;
  AREA_HEIGHT: number;

  private all: Particle[] = [];
  private masker: createjs.Shape;
  private delay: number = 1;
  private count: number = 3;
  private colorIndex: number = 1;
  private size: number = 1;

  constructor() {
    super();

    this.AREA_WIDTH = PrefDetailItemView.AREA_WIDTH;
    this.AREA_HEIGHT = PrefDetailItemView.AREA_HEIGHT;

    this.all = [];

    this.masker = new createjs.Shape();
    this.masker.graphics.beginFill('#00FFFF');
    this.masker.graphics.drawRect(
      1,
      1,
      this.AREA_WIDTH - 2,
      this.AREA_HEIGHT - 2
    );
    this.mask = this.masker;
  }

  changeIndex(index: number) {
    if (index > 25000) this.updateData(1, 100, 0, 25);
    else if (index > 20000) this.updateData(1, 100, 0, 22);
    else if (index > 15000) this.updateData(1, 100, 0, 19);
    else if (index > 10000) this.updateData(1, 100, 0, 16);
    else if (index > 8500) this.updateData(1, 100, 2, 14);
    else if (index > 6500) this.updateData(1, 100, 5, 12);
    else if (index > 5000) this.updateData(1, 90, 10, 10);
    else if (index > 4000) this.updateData(1, 80, 15, 9);
    else if (index > 3000) this.updateData(1, 70, 20, 8);
    else if (index > 2000) this.updateData(1, 50, 30, 7);
    else if (index > 1000) this.updateData(1, 30, 40, 6);
    else if (index > 500) this.updateData(1, 20, 50, 5);
    else if (index > 100) this.updateData(1, 10, 60, 4);
    else if (index > 0) this.updateData(1, 5, 70, 3);
    else this.updateData(0, 5, 70, 3);
  }

  updateData(
    count: number,
    delay: number,
    colorIndex: number,
    size: number
  ): void {
    this.delay = delay;
    this.count = count;
    this.colorIndex = colorIndex;
    this.size = size;
  }

  play(): void {
    this.masker.x = this.x;
    this.masker.y = this.y;

    this.addEventListener('tick', (e: createjs.Event) => {
      this.handleTick();
    });
  }

  private handleTick(): void {
    let p: Particle;

    if (Math.random() * 100 < this.delay) {
      for (var i = 0; i < this.count; i++) {
        p = PollenParticle.pool.shift() || new Particle();
        p.init(
          Math.random() * 4 - 2,
          -Math.random() * 4,
          this.colorIndex + 12 * Math.random(),
          this.size
        );
        this.all.push(p);
        this.addChild(p);
      }
    }

    for (i = 0; i < this.all.length; i++) {
      p = this.all[i];
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -4 || p.x > this.AREA_WIDTH + 4 || p.y > this.AREA_HEIGHT + 4) {
        this.removeChild(p);
        this.all.splice(i, 1);
        PollenParticle.pool.push(p);
      }
    }
  }

  stop() {
    this.all = null;
    this.removeAllEventListeners('tick');
    this.removeAllChildren();
  }
}

class Particle extends createjs.Shape {
  vx: number;
  vy: number;
  g: number;

  init(vx: number, vy: number, colorH: number, size: number): void {
    let s: number = 2;
    this.vx = vx * s;
    this.vy = vy * s;
    this.g = 0.1 * s;
    this.x = PrefDetailItemView.AREA_WIDTH * 0.5;
    this.y = PrefDetailItemView.AREA_HEIGHT * 0.5;

    this.graphics.clear();
    this.graphics.beginFill(createjs.Graphics.getHSL(colorH, 60, 50, 1));
    this.graphics.drawCircle(0, 0, size * 0.5);
    this.graphics.beginFill(createjs.Graphics.getHSL(colorH, 60, 50, 0.5));
    this.graphics.drawCircle(0, 0, size);

    this.mouseEnabled = false;
    this.compositeOperation = 'lighter';
  }
}
