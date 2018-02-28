(function (lib, img, cjs) {

var p; // shortcut to reference prototypes
var rect; // used to reference frame bounds

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 60,
	color: "#000000",
	manifest: []
};

// stage content:
(lib.Preloader = function() {
	this.initialize();

	// PreloaderAsset
	this.instance = new lib.PreloaderAsset();
	this.instance.setTransform(275.5,185);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(548,398,5,5);
p.frameBounds = [rect];


// symbols:
(lib.PreloaderCircle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().de(-8.2,-8.2,16.5,16.5);
	this.shape.setTransform(0,15.5,0.303,0.303,0,0,180);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(-2.5,13,5,5);
p.frameBounds = [rect];


(lib.PreloaderCircleGr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// PreloaderCircle コピー
	this.instance = new lib.PreloaderCircle();
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:13,alpha:0.27},0).wait(1).to({scaleX:1,scaleY:1,rotation:24.1,alpha:0.371},0).wait(1).to({scaleX:1,scaleY:1,rotation:33.8,alpha:0.441},0).wait(1).to({rotation:42.4,alpha:0.488},0).wait(1).to({rotation:50.1,alpha:0.531},0).wait(1).to({scaleX:1,scaleY:1,rotation:57.2,alpha:0.57},0).wait(1).to({rotation:63.7,alpha:0.609},0).wait(1).to({rotation:69.7,alpha:0.641},0).wait(1).to({rotation:75.2,alpha:0.66},0).wait(1).to({rotation:80.2,alpha:0.68},0).wait(1).to({scaleX:1,scaleY:1,rotation:85.2,alpha:0.711},0).wait(1).to({rotation:89.5,alpha:0.73},0).wait(1).to({rotation:93.6,alpha:0.738},0).wait(1).to({rotation:97.6,alpha:0.762},0).wait(1).to({scaleX:1,scaleY:1,rotation:101.3,alpha:0.77},0).wait(1).to({rotation:105,alpha:0.789},0).wait(1).to({rotation:108.3,alpha:0.801},0).wait(1).to({rotation:111.5,alpha:0.809},0).wait(1).to({rotation:114.6,alpha:0.82},0).wait(1).to({rotation:117.6,alpha:0.828},0).wait(1).to({rotation:120.3,alpha:0.84},0).wait(1).to({rotation:122.9,alpha:0.852},0).wait(1).to({scaleX:1,scaleY:1,rotation:125.5,alpha:0.859},0).wait(1).to({scaleX:1,scaleY:1,rotation:127.9},0).wait(1).to({rotation:130.3,alpha:0.871},0).wait(1).to({scaleX:1,scaleY:1,rotation:132.5,alpha:0.879},0).wait(1).to({scaleX:1,scaleY:1,rotation:134.6},0).wait(1).to({rotation:136.7,alpha:0.891},0).wait(1).to({rotation:138.7},0).wait(1).to({rotation:140.6,alpha:0.898},0).wait(1).to({rotation:142.4},0).wait(1).to({rotation:144.4,alpha:0.91},0).wait(1).to({rotation:146.1},0).wait(1).to({scaleX:1,scaleY:1,rotation:147.7},0).wait(1).to({rotation:149.4,alpha:0.922},0).wait(1).to({rotation:150.9},0).wait(1).to({rotation:152.4},0).wait(1).to({rotation:154,alpha:0.93},0).wait(1).to({rotation:155.4},0).wait(1).to({rotation:156.9},0).wait(1).to({rotation:158.2,alpha:0.941},0).wait(1).to({rotation:159.7},0).wait(1).to({rotation:161},0).wait(1).to({rotation:162.2},0).wait(1).to({rotation:163.7,alpha:0.949},0).wait(1).to({rotation:164.9},0).wait(1).to({rotation:166.2},0).wait(1).to({rotation:167.2},0).wait(1).to({rotation:168.5,alpha:0.961},0).wait(1).to({rotation:169.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:170.9},0).wait(1).to({rotation:172,alpha:0.969},0).wait(1).to({rotation:173.2},0).wait(1).to({rotation:174.4},0).wait(1).to({rotation:175.5,alpha:0.98},0).wait(1).to({rotation:176.7},0).wait(1).to({rotation:177.7},0).wait(1).to({rotation:179,alpha:0.988},0).wait(1).to({rotation:180,alpha:1},0).wait(1).to({rotation:181.3},0).wait(1).to({rotation:182.8,alpha:0.988},0).wait(1).to({rotation:184.5},0).wait(1).to({rotation:186.5,alpha:0.98},0).wait(1).to({rotation:188.8,alpha:0.961},0).wait(1).to({scaleX:1,scaleY:1,rotation:191.3,alpha:0.949},0).wait(1).to({rotation:194.1,alpha:0.93},0).wait(1).to({rotation:197.3,alpha:0.91},0).wait(1).to({rotation:200.6,alpha:0.891},0).wait(1).to({rotation:204.3,alpha:0.871},0).wait(1).to({rotation:208.3,alpha:0.852},0).wait(1).to({scaleX:1,scaleY:1,rotation:212.8,alpha:0.828},0).wait(1).to({rotation:217.4,alpha:0.809},0).wait(1).to({rotation:222.4,alpha:0.789},0).wait(1).to({rotation:227.7,alpha:0.762},0).wait(1).to({rotation:233.4,alpha:0.738},0).wait(1).to({scaleX:1,scaleY:1,rotation:239.4,alpha:0.719},0).wait(1).to({rotation:245.7,alpha:0.691},0).wait(1).to({rotation:252.4,alpha:0.672},0).wait(1).to({rotation:259.2,alpha:0.648},0).wait(1).to({scaleX:1,scaleY:1,rotation:266.5,alpha:0.629},0).wait(1).to({rotation:274,alpha:0.602},0).wait(1).to({scaleX:1,scaleY:1,rotation:281.8,alpha:0.578},0).wait(1).to({rotation:290,alpha:0.57},0).wait(1).to({rotation:298.3,alpha:0.551},0).wait(1).to({scaleX:1,scaleY:1,rotation:306.9,alpha:0.531},0).wait(1).to({rotation:315.9,alpha:0.52},0).wait(1).to({rotation:324.7,alpha:0.512},0).wait(1).to({scaleX:1,scaleY:1,rotation:333.9,alpha:0.5},0).wait(1).to({rotation:343.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:352.4},0).wait(1).to({rotation:361.5},0).wait(1).to({scaleX:1,scaleY:1,rotation:370.8,alpha:0.512},0).wait(1).to({rotation:380.1,alpha:0.531},0).wait(1).to({rotation:389.3,alpha:0.539},0).wait(1).to({scaleX:1,scaleY:1,rotation:398.3,alpha:0.559},0).wait(1).to({scaleX:1,scaleY:1,rotation:407.2,alpha:0.578},0).wait(1).to({scaleX:1,scaleY:1,rotation:415.9,alpha:0.59},0).wait(1).to({scaleX:1,scaleY:1,rotation:424.7,alpha:0.621},0).wait(1).to({rotation:432.9,alpha:0.641},0).wait(1).to({rotation:441,alpha:0.66},0).wait(1).to({scaleX:1,scaleY:1,rotation:448.9,alpha:0.68},0).wait(1).to({rotation:456.3,alpha:0.699},0).wait(1).to({scaleX:1,scaleY:1,rotation:463.5,alpha:0.73},0).wait(1).to({rotation:470.5,alpha:0.75},0).wait(1).to({rotation:477.1,alpha:0.77},0).wait(1).to({scaleX:1,scaleY:1,rotation:483.6,alpha:0.801},0).wait(1).to({rotation:489.6,alpha:0.82},0).wait(1).to({rotation:495.4,alpha:0.84},0).wait(1).to({rotation:500.9,alpha:0.859},0).wait(1).to({rotation:506.2,alpha:0.891},0).wait(1).to({scaleX:1,scaleY:1,rotation:511,alpha:0.91},0).wait(1).to({rotation:515.7,alpha:0.922},0).wait(1).to({rotation:519.9,alpha:0.941},0).wait(1).to({rotation:524,alpha:0.961},0).wait(1).to({rotation:527.7,alpha:0.969},0).wait(1).to({scaleX:1,scaleY:1,rotation:531.2,alpha:0.98},0).wait(1).to({rotation:534.5,alpha:0.988},0).wait(1).to({rotation:537.4},0).wait(1).to({rotation:540,alpha:1},0).wait(1).to({rotation:542.5,alpha:0.988},0).wait(1).to({rotation:544.8},0).wait(1).to({rotation:547},0).wait(1).to({scaleX:1,scaleY:1,rotation:549},0).wait(1).to({rotation:551,alpha:0.98},0).wait(1).to({rotation:552.8},0).wait(1).to({rotation:554.8},0).wait(1).to({rotation:556.3},0).wait(1).to({rotation:558},0).wait(1).to({rotation:559.6},0).wait(1).to({rotation:561.1},0).wait(1).to({rotation:562.6,alpha:0.969},0).wait(1).to({rotation:564},0).wait(1).to({rotation:565.3},0).wait(1).to({rotation:566.6},0).wait(1).to({rotation:568.1},0).wait(1).to({rotation:569.3},0).wait(1).to({rotation:570.6,alpha:0.961},0).wait(1).to({rotation:571.8},0).wait(1).to({scaleX:1,scaleY:1,rotation:573.1},0).wait(1).to({rotation:574.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:575.5,alpha:0.949},0).wait(1).to({scaleX:1,scaleY:1,rotation:576.6},0).wait(1).to({rotation:577.9},0).wait(1).to({rotation:579.1,alpha:0.941},0).wait(1).to({rotation:580.4},0).wait(1).to({rotation:581.6},0).wait(1).to({rotation:582.9,alpha:0.93},0).wait(1).to({rotation:584.3},0).wait(1).to({rotation:585.6,alpha:0.922},0).wait(1).to({rotation:586.9},0).wait(1).to({rotation:588.4,alpha:0.91},0).wait(1).to({rotation:589.9},0).wait(1).to({rotation:591.4,alpha:0.898},0).wait(1).to({rotation:592.9,alpha:0.891},0).wait(1).to({rotation:594.6},0).wait(1).to({rotation:596.2,alpha:0.879},0).wait(1).to({scaleX:1,scaleY:1,rotation:597.9,alpha:0.871},0).wait(1).to({rotation:599.9,alpha:0.859},0).wait(1).to({scaleX:1,scaleY:1,rotation:601.8,alpha:0.852},0).wait(1).to({scaleX:1,scaleY:1,rotation:603.9,alpha:0.84},0).wait(1).to({rotation:606,alpha:0.828},0).wait(1).to({rotation:608.2,alpha:0.809},0).wait(1).to({rotation:610.7,alpha:0.801},0).wait(1).to({rotation:613.2,alpha:0.789},0).wait(1).to({rotation:616,alpha:0.77},0).wait(1).to({rotation:619,alpha:0.75},0).wait(1).to({scaleX:1,scaleY:1,rotation:622.2,alpha:0.738},0).wait(1).to({rotation:625.7,alpha:0.711},0).wait(1).to({rotation:629.2,alpha:0.691},0).wait(1).to({rotation:633.3,alpha:0.672},0).wait(1).to({rotation:637.8,alpha:0.641},0).wait(1).to({scaleX:1,scaleY:1,rotation:642.6,alpha:0.609},0).wait(1).to({rotation:648.3,alpha:0.578},0).wait(1).to({rotation:654.5,alpha:0.539},0).wait(1).to({rotation:661.8,alpha:0.488},0).wait(1).to({scaleX:1,scaleY:1,rotation:670.4,alpha:0.43},0).wait(1).to({rotation:681.1,alpha:0.359},0).wait(1).to({scaleX:1,scaleY:1,rotation:695.4,alpha:0.27},0).wait(1).to({scaleX:1,scaleY:1,rotation:720,alpha:0},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-18,-18,36.1,36);
p.frameBounds = [rect, new cjs.Rectangle(-18,-18,36.1,36.1), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-18.1,-18,36.2,36), rect, new cjs.Rectangle(-18,-18,36.1,36), new cjs.Rectangle(-18.1,-18,36.2,36), new cjs.Rectangle(-18.2,-18,36.3,36), new cjs.Rectangle(-18.1,-18,36.2,36), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-18,-18,36.1,36.1), new cjs.Rectangle(-18,-18.1,36.1,36.1), rect=new cjs.Rectangle(-18,-18.1,36.1,36.2), rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-18,-18.1,36.1,36.1), rect, new cjs.Rectangle(-18,-18,36.1,36.1), new cjs.Rectangle(-18,-18,36.1,36), new cjs.Rectangle(-18,-18,36.1,36.1), new cjs.Rectangle(-18,-18.1,36.1,36.1), new cjs.Rectangle(-18,-18.1,36.1,36.2), rect=new cjs.Rectangle(-18,-18.2,36.1,36.2), rect, new cjs.Rectangle(-18,-18.1,36.1,36.2), new cjs.Rectangle(-18,-18,36.1,36.1), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-18,-18,36.2,36), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-18,-18,36.1,36.2), rect=new cjs.Rectangle(-18,-18,36.1,36.1), rect, rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-18.1,-18,36.2,36), new cjs.Rectangle(-18,-18,36.1,36), rect=new cjs.Rectangle(-18.1,-18,36.2,36), rect, rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-18,-18.1,36.1,36.2), new cjs.Rectangle(-18,-18.2,36.1,36.2), new cjs.Rectangle(-18,-18.1,36.1,36.2), new cjs.Rectangle(-18,-18.1,36.1,36.1), new cjs.Rectangle(-18,-18,36.1,36), new cjs.Rectangle(-18,-18.1,36.1,36.1), rect=new cjs.Rectangle(-18,-18.1,36.1,36.2), rect, rect, rect, new cjs.Rectangle(-18,-18.1,36.1,36.1), new cjs.Rectangle(-18,-18,36.1,36.1), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-18,-18,36.2,36), rect, rect, rect=new cjs.Rectangle(-18,-18,36.1,36), rect, new cjs.Rectangle(-18,-18,36.2,36), rect=new cjs.Rectangle(-18,-18,36.1,36), rect, rect, rect, rect, rect, rect, rect];


(lib.PreloaderAsset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// PreloaderCircleGr
	this.instance = new lib.PreloaderCircleGr("synched",0,false);
	this.instance.setTransform(0,0,1,1,-80);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(206));

	// PreloaderCircleGr
	this.instance_1 = new lib.PreloaderCircleGr("synched",0,false);
	this.instance_1.setTransform(0,0,1,1,-60);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({_off:false},0).wait(212));

	// PreloaderCircleGr
	this.instance_2 = new lib.PreloaderCircleGr("synched",0,false);
	this.instance_2.setTransform(0,0,1,1,-40);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).wait(218));

	// PreloaderCircleGr
	this.instance_3 = new lib.PreloaderCircleGr("synched",0,false);
	this.instance_3.setTransform(0,0,1,1,-20);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5).to({_off:false},0).wait(224));

	// PreloaderCircleGr
	this.instance_4 = new lib.PreloaderCircleGr("synched",0,false);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(229));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-18,-18,36.1,36);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(-18,-18,36.1,36.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];

})(window.lib = window.lib||{}, window.images = window.images||{}, window.createjs = window.createjs||{});
var lib, images, createjs;
