/*
 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 Yasunobu Ikeda
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// / <reference path="libs/easeljs/easeljs.d.ts" />

export class ShuffleEaselText extends createjs.Text {
  /** ランダムテキストに用いる文字列 */
  sourceRandomCharacter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  /** 空白に用いる文字列 */
  emptyCharacter: string = '-';
  /** 再生中かどうかを示すブール値 */
  isRunning: boolean = false;
  /** エフェクトの実行時間 */
  duration: number = 600;

  private _orijinalStr: string = '';
  private _orijinalLength: number;
  private _timeCurrent: number = 0;
  private _timeStart: number = 0;
  private _randomIndex: number[] = [];

  /** テキストを設定します。 */
  setText(text: string) {
    this._orijinalStr = text;
    this._orijinalLength = text.length;
  }

  /** 再生を開始します。 */
  start() {
    this.stop();

    this._randomIndex = [];
    let str = '';
    for (let i: number = 0; i < this._orijinalLength; i++) {
      let rate = i / this._orijinalLength;
      this._randomIndex[i] = Math.random() * (1 - rate) + rate;
      str += this.emptyCharacter;
    }

    this._timeStart = new Date().getTime();
    this.addEventListener('tick', (event) => {
      this.handleTick();
    });
    this.isRunning = true;

    this.text = str;
  }

  /** 停止します。 */
  stop() {
    if (this.isRunning) this.removeAllEventListeners('tick');
    this.isRunning = false;
  }

  private handleTick(): void {
    this._timeCurrent = new Date().getTime() - this._timeStart;
    let percent = this._timeCurrent / this.duration;

    let str = '';
    for (let i = 0; i < this._orijinalLength; i++) {
      if (percent >= this._randomIndex[i]) {
        str += this._orijinalStr.charAt(i);
      } else if (percent < this._randomIndex[i] / 3) {
        str += this.emptyCharacter;
      } else {
        str += this.sourceRandomCharacter.charAt(
          Math.floor(Math.random() * this.sourceRandomCharacter.length)
        );
      }
    }

    if (percent > 1) {
      str = this._orijinalStr;
      this.removeAllEventListeners('tick');
      this.isRunning = false;
    }
    this.text = str;
  }
}
