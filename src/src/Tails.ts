const NUM_LTAILS: number = 20;

export class Tails extends createjs.Container {
  private tailList: Tail2[] = [];
  private shape: createjs.Shape;
  public init(): void {
    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    for (let i: number = 0; i < NUM_LTAILS; i++) {
      let tail: Tail2 = new Tail2();
      // tail.init(0, 0, 5 + (i / NUM_LTAILS), 0.3, 50);
      // tail.graphics.beginFill("#0F0").drawCircle(0, 0, 3);
      // this.addChild(tail);
      this.tailList.push(tail);
    }
  }

  public setPoint(positions: any[]): void {
    for (let i: number = 0; i < NUM_LTAILS; i++) {
      const tail: Tail2 = <Tail2> this.tailList[i];

      const obj: any = positions[(positions.length * Math.random()) >> 0];
      const cx: number = obj.x;
      const cy: number = obj.y;

      const currentX: number = tail.point.x;
      const currentY: number = tail.point.y;
      const px: number = cx - currentX;
      const py: number = cy - currentY;
      const len: number = Math.sqrt(px * px + py * py);
      const radian: number = Math.atan2(py, px);

      const dlen: number = len;
      const dx: number =
        dlen * Math.cos(radian + Math.PI * (Math.random() - 0.5));
      const dy: number =
        dlen * Math.sin(radian + Math.PI * (Math.random() - 0.5));

      createjs.Tween.get(tail.point, {override: true}).to(
        {
          guide: {
            path: [currentX, currentY, currentX + dx, currentY + dy, cx, cy],
          },
        },
        1000 + 800 * Math.random(),
        createjs.Ease.getPowOut(5)
      );
    }
  }

  public update(): void {
    const g: createjs.Graphics = this.shape.graphics;
    g.clear();

    for (let i: number = 0; i < NUM_LTAILS; i++) {
      const tail: Tail2 = <Tail2> this.tailList[i];

      tail.update();

      for (let j: number = 0; j < tail.drawLines.length; j++) {
        g.setStrokeStyle(1);
        g.beginStroke('rgba(128,128,128, ' + j / tail.drawLines.length + ')'); // 線のスタイル
        g.moveTo(tail.drawLines[j][0], tail.drawLines[j][1]);
        g.lineTo(tail.drawLines[j][2], tail.drawLines[j][3]);
      }
    }

    g.endStroke();

    for (let i: number = 0; i < NUM_LTAILS; i++) {
      const tail: Tail2 = <Tail2> this.tailList[i];
      if (tail.drawLines.length > 0) {
        let index = tail.drawLines.length - 1;
        g
          .beginFill('#888')
          .drawCircle(tail.drawLines[index][2], tail.drawLines[index][3], 2)
          .endFill();
      }
    }
  }
}

class Tail2 {
  public point: createjs.Point = new createjs.Point(0, 0);
  public prev: createjs.Point = new createjs.Point(0, 0);
  public drawLines: any[] = [];

  public update(): void {
    let dx: number = this.point.x - this.prev.x;
    let dy: number = this.point.y - this.prev.y;

    let len: number = Math.sqrt(dx * dx + dy * dy);

    // 描画ラインを追加
    if (len > 0) {
      this.drawLines.push([
        this.prev.x,
        this.prev.y,
        this.point.x,
        this.point.y,
      ]);
      if (this.drawLines.length > 15) {
        this.drawLines.shift();
      }
    } else {
      if (this.drawLines.length > 0) {
        this.drawLines.shift();
      }
    }

    this.prev.x = this.point.x;
    this.prev.y = this.point.y;
  }
}
