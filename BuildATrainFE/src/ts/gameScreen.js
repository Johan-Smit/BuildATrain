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
function drawGame() {
    return __awaiter(this, void 0, void 0, function () {
        var gridSize, grass1, y, x, y, x, vertTrans, y, vertTrans2, y, sand1, x, y, x, y, x, horzTrans, y, horzTrans2, x, treesB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gridSize = 50;
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass1.png')];
                case 1:
                    grass1 = _a.sent();
                    //Top Left Grass
                    for (y = 4; y < 254; y = y + gridSize) {
                        for (x = 4; x < 254; x = x + gridSize) {
                            ctx.drawImage(grass1, y, x, gridSize, gridSize);
                        }
                    }
                    //Right Grass
                    for (y = 104; y < 404; y = y + gridSize) {
                        for (x = 604; x < 854; x = x + gridSize) {
                            ctx.drawImage(grass1, x, y, 53, gridSize);
                        }
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionE.png')];
                case 2:
                    vertTrans = _a.sent();
                    for (y = 4; y < 254; y = y + gridSize) {
                        ctx.drawImage(vertTrans, 254, y, gridSize, gridSize);
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionW.png')];
                case 3:
                    vertTrans2 = _a.sent();
                    // Top right Vertical Transition
                    for (y = 104; y < 404; y = y + gridSize) {
                        ctx.drawImage(vertTrans2, 554, y, gridSize, gridSize);
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileSand1.png')];
                case 4:
                    sand1 = _a.sent();
                    for (x = 304; x < 554; x = x + gridSize) {
                        for (y = 4; y < 400; y = y + gridSize) {
                            ctx.drawImage(sand1, x, y, gridSize, gridSize);
                        }
                    }
                    //top right sand
                    for (x = 554; x < 854; x = x + gridSize) {
                        ctx.drawImage(sand1, x, 4, 53, gridSize);
                    }
                    ctx.drawImage(sand1, 554, 54, gridSize, gridSize);
                    //Left Bottom Sand
                    for (y = 254; y < 400; y = y + gridSize) {
                        for (x = 4; x < 304; x = x + gridSize) {
                            ctx.drawImage(sand1, x, y, gridSize, gridSize);
                        }
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionS.png')];
                case 5:
                    horzTrans = _a.sent();
                    for (y = 4; y < 254; y = y + gridSize) {
                        ctx.drawImage(horzTrans, y, 254, gridSize, gridSize);
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionN.png')];
                case 6:
                    horzTrans2 = _a.sent();
                    for (x = 604; x < 854; x = x + gridSize) {
                        ctx.drawImage(horzTrans2, x, 54, 53, gridSize);
                    }
                    return [4 /*yield*/, loadImage('./images/gameGrid/treeBrown_large.png')];
                case 7:
                    treesB = _a.sent();
                    ctx.drawImage(treesB, 254, 254, gridSize, gridSize);
                    ctx.drawImage(treesB, 554, 54, gridSize, gridSize);
                    drawTracks();
                    return [2 /*return*/];
            }
        });
    });
}
function drawTracks() {
    return __awaiter(this, void 0, void 0, function () {
        var trackSize, horzTrack, x, x, x, x, x, x, vertTrack, y, y, y, y, y, tlTurn, blTurn, trTurn, brTurn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trackSize = 30;
                    return [4 /*yield*/, loadImage('./images/trainTracks/horzTrack.png')];
                case 1:
                    horzTrack = _a.sent();
                    for (x = 4; x < 244; x = x + trackSize) {
                        ctx.drawImage(horzTrack, x, 65, trackSize, trackSize);
                    }
                    for (x = 214; x > 34; x = x - trackSize) {
                        ctx.drawImage(horzTrack, x, 214, trackSize, trackSize);
                    }
                    for (x = 64; x < 394; x = x + trackSize) {
                        ctx.drawImage(horzTrack, x, 334, trackSize, trackSize);
                    }
                    for (x = 454; x < 544; x = x + trackSize) {
                        ctx.drawImage(horzTrack, x, 214, trackSize, trackSize);
                    }
                    for (x = 574; x < 664; x = x + trackSize) {
                        ctx.drawImage(horzTrack, x, 364, trackSize, trackSize);
                    }
                    for (x = 694; x < 844; x = x + trackSize) {
                        ctx.drawImage(horzTrack, x, 94, trackSize, trackSize);
                    }
                    ctx.drawImage(horzTrack, 826, 94, trackSize, trackSize);
                    return [4 /*yield*/, loadImage('./images/trainTracks/vertTrack2.png')];
                case 2:
                    vertTrack = _a.sent();
                    for (y = 95; y < 214; y = y + trackSize) {
                        ctx.drawImage(vertTrack, 244, y, trackSize, trackSize);
                    }
                    for (y = 244; y < 334; y = y + trackSize) {
                        ctx.drawImage(vertTrack, 34, y, trackSize, trackSize);
                    }
                    ctx.drawImage(vertTrack, 394, 364, trackSize, trackSize);
                    ctx.drawImage(vertTrack, 394, 374, trackSize, trackSize);
                    for (y = 4; y < 214; y = y + trackSize) {
                        ctx.drawImage(vertTrack, 424, y, trackSize, trackSize);
                    }
                    for (y = 244; y < 364; y = y + trackSize) {
                        ctx.drawImage(vertTrack, 544, y, trackSize, trackSize);
                    }
                    for (y = 334; y > 94; y = y - trackSize) {
                        ctx.drawImage(vertTrack, 664, y, trackSize, trackSize);
                    }
                    return [4 /*yield*/, loadImage('./images/trainTracks/topLeftTurn.png')];
                case 3:
                    tlTurn = _a.sent();
                    ctx.drawImage(tlTurn, 244, 65, trackSize, trackSize);
                    ctx.drawImage(tlTurn, 394, 334, trackSize, trackSize);
                    ctx.drawImage(tlTurn, 544, 214, trackSize, trackSize);
                    return [4 /*yield*/, loadImage('./images/trainTracks/bottomLeftTurn.png')];
                case 4:
                    blTurn = _a.sent();
                    ctx.drawImage(blTurn, 244, 214, trackSize, trackSize);
                    ctx.drawImage(blTurn, 664, 364, trackSize, trackSize);
                    return [4 /*yield*/, loadImage('./images/trainTracks/topRightTurn.png')];
                case 5:
                    trTurn = _a.sent();
                    ctx.drawImage(trTurn, 34, 214, trackSize, trackSize);
                    ctx.drawImage(trTurn, 664, 94, trackSize, trackSize);
                    return [4 /*yield*/, loadImage('./images/trainTracks/bottomRightTurn.png')];
                case 6:
                    brTurn = _a.sent();
                    ctx.drawImage(brTurn, 34, 334, trackSize, trackSize);
                    ctx.drawImage(brTurn, 424, 214, trackSize, trackSize);
                    ctx.drawImage(brTurn, 544, 364, trackSize, trackSize);
                    return [2 /*return*/];
            }
        });
    });
}
setupComponents();
drawGame();
