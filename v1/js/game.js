var env = new Object();
env.mapWidth = 3300;
env.leftBound = 160;
env.rightBound = 450;
env.grayScale = false;
env.entities = [];
env.billboards = [];
env.positive = [
    "<div>WARMA GO!</div>",
    "<div>沃玛来了哦！</div>",
    "<div>我是沃玛，做点傻开心的视频。</div>",
    "<div>LOFTER上面有一个记梦的主页</div>",
    "<div>最开始成为天使的时候</div>",
    "<div>长沙口音的精髓，在于尾音上扬↗</div>"
];
env.cover = new Object();
env.cover.outerNode = null;
env.cover.innerNode = null;
env.cover.inSide = false;
env.cover.rnd1 = 0;
env.cover.rnd2 = 0;
env.cover.hp = 7;
env.contentNode = null;
env.groundNode = null;
env.overlayNode = null;
var ctl = new Object();
ctl.keys = "asdfopqwer";
ctl.pressed = {"a":false,"s":false,"d":false,"f":false,"o":false,"p":false,"q":false,"w":false,"e":false,"r":false};
ctl.released = true;
ctl.mapping = {"q":null,"w":null,"e":null,"r":null};
ctl.seq = "";
ctl.seqNode = null;
ctl.t0 = 0;
ctl.t1 = 0;
var chr = new Object();
chr.change = true;
chr.dir = false;
chr.px = 200;
chr.speed = 0;
chr.speedLevels = [0, 12, 18, 23, 27];
chr.t0 = 0;
chr.idle = "dong";
chr.action = chr.idle;
chr.actionNode = null;
chr.cream = false;
chr.node = null;
chr.san = new Object();
chr.san.value = 100;
chr.san.borderNode = null;
chr.san.percentNode = null;
var au = new Object();
au.purePlayer = null;
au.voicePlayer = null;
au.extinguisherPlayer = null;
function collectNodes() {
    env.contentNode = document.getElementById("content");
    env.groundNode = document.getElementById("ground");
    env.overlayNode = document.getElementById("overlay");
    ctl.seqNode = document.getElementById("ctl-seq");
    chr.actionNode = document.getElementById("ctl-action");
    chr.node = document.getElementById("character");
    chr.san.borderNode = document.getElementById("san-border");
    chr.san.percentNode = document.getElementById("san-percent");
    au.purePlayer = document.getElementById("au-pure");
    au.voicePlayer = document.getElementById("au-voice");
    au.extinguisherPlayer = document.getElementById("au-extinguisher");
    var widthStyle = "width: " + env.mapWidth + "px;";
    env.groundNode.style = widthStyle;
    env.overlayNode.style = widthStyle;
    ctl.seqNode.innerHTML = ctl.seq;
    chr.actionNode.innerHTML = chr.action;
}
function createBillboards() {
    var i = 0;
    var left = 310;
    while (left < env.mapWidth) {
        var obj = new Object();
        obj.positive = true;
        if (i < env.positive.length && env.positive[i] != null) {
            var bbNode = document.createElement("div");
            bbNode.className = "billboard";
            bbNode.innerHTML = env.positive[i];
            bbNode.style = "left: " + (310 + 400 * i) + "px;";
            env.groundNode.appendChild(bbNode);
            obj.node = bbNode;
        } else {
            obj.node = null;
        }
        env.billboards.push(obj);
        i++;
        left += 400;
    }
}
function createCake() {
    var node = null;
    node = document.createElement("div");
    node.id = "cake";
    node.style = "transform: translateX(" + (env.mapWidth - env.rightBound) + "px);";
    env.groundNode.appendChild(node);
    node = document.createElement("div");
    node.id = "cover-inner";
    env.cover.innerNode = node;
    node = document.createElement("div");
    node.id = "cover-outer";
    node.style = "transform: translateX(" + (env.mapWidth - env.rightBound) + "px);";
    env.cover.outerNode = node;
    node.appendChild(env.cover.innerNode);
    env.overlayNode.appendChild(node);
}
function prepareNodes() {
    collectNodes();
    createBillboards();
    createCake();
}
function setDir(d) {
    if (chr.dir != d) {
        chr.dir = d;
        chr.change = true;
    }
}
function setAction(a) {
    if (chr.action != a) {
        chr.t0 = ctl.t1;
        chr.action = a;
        chr.actionNode.innerHTML = a;
        chr.change = true;
    }
}
function sendHeart() {
    var obj = new Object();
    obj.ttl = 80;
    obj.px = chr.px;
    if (chr.dir) {
        obj.px -= 100;
        obj.vx = -20;
    } else {
        obj.px += 100;
        obj.vx = 20;
    }
    var eNode = document.createElement("div");
    eNode.className = "entity";
    eNode.style = "display: none;";
    env.groundNode.appendChild(eNode);
    obj.node = eNode;
    env.entities.push(obj);
}
function seqChange() {
    var seq = ctl.seq;
    ctl.seqNode.innerHTML = seq;
    if (seq.endsWith("sSsSsSsS")) {
        if (chr.px < env.leftBound + 200) {
            chr.idle = "dong";
        } else {
            chr.idle = "jan";
        }
    }
    if (seq.endsWith("dDdDdDdD")) {
        if (chr.px > env.mapWidth - env.rightBound - 200) {
            chr.idle = "ene";
        } else {
            chr.idle = "o";
        }
    }
    if (seq.endsWith("aPpPpS") || seq.endsWith("fPpPpD")) {
        chr.speed = 0;
        setAction("sunsun");
        return;
    }
    if (seq.endsWith("aPpS") || seq.endsWith("fPpD")) {
        chr.speed = 0;
        setAction("eiheiheihei");
        return;
    }
    if (seq.endsWith("aAaS") || seq.endsWith("fFfD")) {
        chr.speed = 0;
        setAction("ho");
        return;
    }
    if (seq.endsWith("DSs") || seq.endsWith("SDd")) {
        chr.speed = 0;
        if (Math.random() < 0.5) {
            setAction("gyu");
        } else {
            setAction("gyui");
        }
        return;
    }
    if (seq.endsWith("DSd") || seq.endsWith("SDs")) {
        chr.speed = 0;
        setAction("qbing");
        return;
    }
    if (seq.endsWith("DS") || seq.endsWith("SD")) {
        chr.speed = 0;
        setAction("en");
        return;
    }
    if (seq.endsWith("PSsS") || seq.endsWith("PDdD")) {
        chr.speed = 0;
        setAction("pikapika");
        return;
    }
    if (seq.endsWith("aA")) {
        setDir(true);
        chr.speed = chr.speedLevels[4];
        setAction("gulugulu");
        chr.cream = 0;
        return;
    }
    if (seq.endsWith("fF")) {
        setDir(false);
        chr.speed = chr.speedLevels[4];
        setAction("gulugulu");
        chr.cream = 0;
        return;
    }
    if (seq.endsWith("sS")) {
        setDir(true);
        chr.speed = chr.speedLevels[2];
        setAction("gadagudong");
        return;
    }
    if (seq.endsWith("dD")) {
        setDir(false);
        chr.speed = chr.speedLevels[2];
        setAction("gadagudong");
        return;
    }
    if (seq.endsWith("PS") || seq.endsWith("PD")) {
        chr.speed = 0;
        setAction("mofumofu");
        return;
    }
    if (seq.endsWith("pP")) {
        chr.speed = 0;
        setAction("sa");
        sendHeart();
        return;
    }
    if ((seq.endsWith("OoOoOoS") || seq.endsWith("OoOoOoD")) && chr.san.value < 50) {
        setDir(seq.endsWith("S"));
        chr.speed = chr.speedLevels[1];
        setAction("noronoro");
        return;
    }
    if (seq.endsWith("OoOoA") || seq.endsWith("OoOoF")) {
        chr.speed = 0;
        setAction("dokodoko");
        return;
    }
    if (seq.endsWith("OoOoS") || seq.endsWith("OoOoD")) {
        chr.speed = 0;
        setAction("niconico");
        return;
    }
    if (seq.endsWith("A") || seq.endsWith("F")) {
        setDir(seq.endsWith("A"));
        chr.speed = chr.speedLevels[3];
        setAction("sasa");
        return;
    }
    if (seq.endsWith("S") || seq.endsWith("D")) {
        setDir(seq.endsWith("S"));
        chr.speed = chr.speedLevels[1];
        setAction("dadadada");
        return;
    }
    if (seq.endsWith("P")) {
        chr.speed = 0;
        if (Math.random() < 0.5) {
            setAction("xiu");
        } else {
            setAction("da");
        }
        return;
    }
    if (seq.endsWith("O")) {
        chr.speed = 0;
        setAction("music");
        return;
    }
    for (var k in ctl.mapping) {
        if (seq.endsWith("OoOoPp" + k.toUpperCase())) {
            var before = seq.substring(0, seq.length - 7);
            if (before.length > 0) {
                ctl.seq = before;
                seqChange();
                ctl.mapping[k] = chr.action;
                return;
            }
        }
        if (ctl.mapping[k] != null && seq.endsWith(k.toUpperCase())) {
            chr.speed = 0;
            setAction(ctl.mapping[k]);
            return;
        }
    }
    chr.speed = 0;
    setAction(chr.idle);
}
function keyDown(c) {
    c = c.toLowerCase();
    var kv = document.getElementById("kv-" + c);
    if (kv != null) {
        kv.className = "button-view pressed";
    }
    if (ctl.pressed[c] != null && !ctl.pressed[c]) {
        if (ctl.released) {
            ctl.released = false;
            if (ctl.t1 - ctl.t0 > 5) {
                ctl.seq = "";
            }
        }
        ctl.pressed[c] = true;
        ctl.seq += c.toUpperCase();
        seqChange();
    }
}
function keyUp(c) {
    c = c.toLowerCase();
    var kv = document.getElementById("kv-" + c);
    if (kv != null) {
        kv.className = "button-view";
    }
    if (ctl.pressed[c] != null && ctl.pressed[c]) {
        ctl.seq += c;
        seqChange();
        ctl.pressed[c] = false;
        for (var i = 0; i < ctl.keys.length; i++) {
            if (ctl.pressed[ctl.keys.charAt(i)]) {
                return;
            }
        }
        ctl.released = true;
        ctl.t0 = ctl.t1;
    }
}
function prepareActions() {
    document.body.onkeydown = function(e) {
        keyDown(e.key);
    }
    document.body.onkeyup = function(e) {
        keyUp(e.key);
    }
    for (var i = 0; i < ctl.keys.length; i++) {
        let c = ctl.keys.charAt(i);
        let btn = document.getElementById("k-" + c);
        if (btn != null) {
            btn.onmousedown = function() {
                keyDown(c);
            };
            btn.onmouseup = function() {
                keyUp(c);
            };
            btn.onmouseleave = btn.onmouseup;
            btn.ontouchstart = function() {
                keyDown(c);
                btn.onmousedown = null;
                btn.onmouseup = null;
                btn.onmouseleave = null;
            };
            btn.ontouchend = btn.onmouseup;
        }
    }
}
function breakCover() {
    var newHp = env.cover.hp - 1;
    if (env.cover.hp > 0 && !(newHp > 0)) {
        env.cover.hp = 0;
        env.cover.innerNode.className = "destroyed";
    } else {
        env.cover.hp = newHp;
    }
}
function tickSan() {
    if (chr.action == "music" && ctl.t1 % 4 == 0) {
        var newSan = Math.max(10, chr.san.value - 1);
        if (newSan != chr.san.value) {
            if (chr.san.value > 30 && !(newSan > 30)) {
                chr.san.borderNode.className = "danger";
            }
            if (chr.san.value > 20 && !(newSan > 20)) {
                env.contentNode.className = "gray";
            }
            chr.san.value = newSan;
            chr.san.percentNode.style = "width: " + newSan + "%;";
        }
    }
}
function tickTransfrom() {
    if (chr.speed != 0) {
        if (chr.dir) {
            chr.px = Math.max(env.leftBound, chr.px - chr.speed);
        } else {
            chr.px = Math.min(env.mapWidth - env.rightBound, chr.px + chr.speed);
        }
        chr.change = true;
    }
    if (chr.change) {
        chr.change = false;
        var gndStyle = "; width: " + env.mapWidth + "px;";
        var chrStyle = chr.action;
        if (chr.cream) {
            chrStyle = chrStyle + "-c";
        }
        chrStyle = "; background-image: url('img/" + chrStyle + ".png');";
        if (chr.dir) {
            chrStyle = " scaleX(-1)" + chrStyle;
        }
        var fullWidth = env.contentNode.clientWidth;
        var halfWidth = 0.5 * fullWidth;
        if (chr.px < halfWidth) {
            gndStyle = "transform: translateX(0px)" + gndStyle;
            chrStyle = "transform: translateX(" + chr.px + "px)" + chrStyle;
        } else if (chr.px > env.mapWidth - halfWidth) {
            gndStyle = "transform: translateX(" + (fullWidth - env.mapWidth) + "px)" + gndStyle;
            chrStyle = "transform: translateX(" + (fullWidth + chr.px - env.mapWidth) + "px)" + chrStyle;
        } else {
            gndStyle = "transform: translateX(" + (halfWidth - chr.px) + "px)" + gndStyle;
            chrStyle = "transform: translateX(" + halfWidth + "px)" + chrStyle;
        }
        env.groundNode.style = gndStyle;
        env.overlayNode.style = gndStyle;
        chr.node.style = chrStyle;
    }
}
function tickCake() {
    if (chr.px > env.mapWidth - env.rightBound - 25) {
        chr.cream = true;
        if (!env.cover.inSide) {
            env.cover.inSide = true;
            breakCover();
        }
        if (chr.san.value != 100) {
            if (!(chr.san.value > 30)) {
                chr.san.borderNode.className = "";
            }
            if (!(chr.san.value > 20)) {
                env.contentNode.className = "";
            }
            chr.san.value = 100;
            chr.san.percentNode.style = "";
        }
        if (env.cover.hp > 0) {
            env.cover.rnd1 = 0.7 * env.cover.rnd1 + 0.3 * (8 * Math.random() - 4);
            env.cover.rnd2 = 0.7 * env.cover.rnd2 + 0.3 * (6 * Math.random() - 3);
            env.cover.outerNode.style = "transform: translate(" + (env.mapWidth - env.rightBound) + "px," + env.cover.rnd1 + "px) rotate(" + env.cover.rnd2 + "deg);";
        }
    } else {
        env.cover.inSide = false;
    }
}
function tickEntities() {
    for (var i = 0; i < env.entities.length; i++) {
        var obj = env.entities[i];
        if (obj.ttl > 0) {
            obj.px += obj.vx;
            obj.node.style = "transform: translateX(" + obj.px + "px);";
            if (Math.abs(obj.px - chr.px) < 80 && chr.action != "gulugulu") {
                var newSan = Math.min(100, chr.san.value + 10);
                if (newSan != chr.san.value) {
                    if (!(chr.san.value > 30) && newSan > 30) {
                        chr.san.borderNode.className = "";
                    }
                    if (!(chr.san.value > 20) && newSan > 20) {
                        env.contentNode.className = "";
                    }
                    chr.san.value = newSan;
                    chr.san.percentNode.style = "width: " + newSan + "%;";
                }
                obj.ttl = 0;
            } else if (obj.px > env.mapWidth - env.rightBound) {
                breakCover();
                obj.ttl = 0;
            } else {
                obj.ttl--;
            }
            if (!obj.ttl > 0) {
                env.groundNode.removeChild(obj.node);
            }
        }
    }
}
function tickMusic() {
    if (ctl.t1 - chr.t0 >= 8) {
        if (chr.action == "dokodoko") {
            if (!au.purePlayer.paused) {
                au.purePlayer.pause();
                au.voicePlayer.currentTime = au.purePlayer.currentTime;
                au.voicePlayer.play();
            } else if (!au.extinguisherPlayer.paused) {
                au.extinguisherPlayer.pause();
                au.voicePlayer.play();
            }
        } else if (chr.action == "music") {
            if (!au.purePlayer.paused) {
                au.purePlayer.pause();
                au.extinguisherPlayer.play();
            } else if (!au.voicePlayer.paused) {
                au.voicePlayer.pause();
                au.extinguisherPlayer.play();
            }
        } else {
            if (!au.voicePlayer.paused) {
                au.voicePlayer.pause();
                au.purePlayer.currentTime = au.voicePlayer.currentTime;
                au.purePlayer.play();
            } else if (!au.extinguisherPlayer.paused) {
                au.extinguisherPlayer.pause();
                au.purePlayer.play();
            }
        }
    }
}
function tick() {
    ctl.t1++;
    tickSan();
    tickTransfrom();
    tickCake();
    tickEntities();
    tickMusic();
}
function startGame() {
    prepareNodes();
    prepareActions();
    window.setInterval(tick, 50);
    au.purePlayer.play();
}
document.onreadystatechange = function(e) {
    if (e.target.readyState == "complete") {
        startGame();
    }
}