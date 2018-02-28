export class SocialButtonBuilder {
  static initialize() {
    // Twitter
    (function(d: HTMLDocument, s: string, id: string) {
      let js: HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = <HTMLScriptElement>d.createElement(s);
        js.id = id;
        js.src = '//platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, 'script', 'twitter-wjs');

    // Facebook
    (function(d: HTMLDocument, s: string, id: string) {
      let js: HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = <HTMLScriptElement>d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/ja_JP/all.js#xfbml=1';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // はてなブックマーク
    (function(d: HTMLDocument, s: string, id: string) {
      let js: HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = <HTMLScriptElement>d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = '//b.st-hatena.com/js/bookmark_button.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'hatena-js');
  }
}
