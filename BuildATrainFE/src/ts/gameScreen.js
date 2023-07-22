var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var canvas;
var ctx;
var windowWidth;
var windowHeight;
var canvasScreenRatio = 0.80;
//TODO: see how I autoresized canvas from prev project
function setupComponents() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.canvas.height = windowHeight * canvasScreenRatio;
    ctx.canvas.width = windowWidth * canvasScreenRatio;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.strokeStyle = "#4951F5";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(2, 2, ctx.canvas.width - 20, ctx.canvas.height - 24);
    ctx.stroke();
}
function loadImage(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.addEventListener('load', function () {
            resolve(image);
        });
        image.addEventListener('error', reject);
        image.src = url;
    });
}
function drawBackGround() {
    return __awaiter(this, void 0, void 0, function () {
        var grass1, y, x, vertTrans, sand1, horzTrans, treesB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass1.png')];
                case 1:
                    grass1 = _a.sent();
                    for (y = 4; y < 254; y = y + 50) {
                        for (x = 4; x < 254; x = x + 50) {
                            ctx.drawImage(grass1, y, x, 50, 50);
                        }
                    }
                    vertTrans = new Image();
                    vertTrans.src = './images/gameGrid/tileGrass_transitionE.png';
                    vertTrans.onload = function () {
                        for (var y = 4; y < 254; y = y + 50) {
                            ctx.drawImage(vertTrans, 254, y, 50, 50);
                        }
                    };
                    sand1 = new Image();
                    sand1.src = './images/gameGrid/tileSand1.png';
                    sand1.onload = function () {
                        for (var x = 304; x < 554; x = x + 50) {
                            for (var y = 4; y < 400; y = y + 50) {
                                ctx.drawImage(sand1, x, y, 50, 50);
                            }
                        }
                        //Left Bottom Sand
                        for (var y = 254; y < 400; y = y + 50) {
                            for (var x = 4; x < 304; x = x + 50) {
                                ctx.drawImage(sand1, x, y, 50, 50);
                            }
                        }
                    };
                    horzTrans = new Image();
                    horzTrans.src = './images/gameGrid/tileGrass_transitionS.png';
                    horzTrans.onload = function () {
                        for (var y = 4; y < 254; y = y + 50) {
                            ctx.drawImage(horzTrans, y, 254, 50, 50);
                        }
                    };
                    treesB = new Image();
                    treesB.src = './images/gameGrid/treeBrown_large.png';
                    treesB.onload = function () {
                        ctx.drawImage(treesB, 254, 254, 50, 50);
                    };
                    return [2 /*return*/];
            }
        });
    });
}
function drawTracks() {
    //All Horizontal Tracks
    var horzTrack = new Image();
    horzTrack.src = './images/trainTracks/horzTrack.png';
    horzTrack.onload = function () {
        for (var x = 4; x < 244; x = x + 30) {
            ctx.drawImage(horzTrack, x, 65, 30, 30);
        }
        for (var x = 214; x > 34; x = x - 30) {
            ctx.drawImage(horzTrack, x, 214, 30, 30);
        }
        for (var x = 64; x < 334; x = x + 30) {
            ctx.drawImage(horzTrack, x, 334, 30, 30);
        }
    };
    //Vertical Tracks
    var vertTrack = new Image();
    vertTrack.src = './images/trainTracks/vertTrack2.png';
    vertTrack.onload = function () {
        for (var y = 95; y < 214; y = y + 30) {
            ctx.drawImage(vertTrack, 244, y, 30, 30);
        }
        for (var y = 244; y < 334; y = y + 30) {
            ctx.drawImage(vertTrack, 34, y, 30, 30);
        }
    };
    //Top Left Turn
    var tlTurn = new Image();
    tlTurn.src = './images/trainTracks/topLeftTurn.png';
    tlTurn.onload = function () {
        ctx.drawImage(tlTurn, 244, 65, 30, 30);
    };
    //Bottom Left Turn
    var blTurn = new Image();
    blTurn.src = './images/trainTracks/bottomLeftTurn.png';
    blTurn.onload = function () {
        ctx.drawImage(blTurn, 244, 214, 30, 30);
    };
    //Top Right Turn
    var trTurn = new Image();
    trTurn.src = './images/trainTracks/topRightTurn.png';
    trTurn.onload = function () {
        ctx.drawImage(trTurn, 34, 214, 30, 30);
    };
    //Bottom Right Turn
    var brTurn = new Image();
    brTurn.src = './images/trainTracks/bottomRightTurn.png';
    brTurn.onload = function () {
        ctx.drawImage(brTurn, 34, 334, 30, 30);
    };
}
function drawGame() {
    drawBackGround();
    drawTracks();
}
setupComponents();
drawGame();
