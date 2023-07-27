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
var _this = this;
var canvas;
var ctx;
var windowWidth;
var windowHeight;
var pixelSizeX;
var pixelSizeY;
var defaultWidth = 1097;
var defaultHeight = 535;
var gameDone = false;
var trainTimer = 0;
var grass;
var vertTrans;
var vertTrans2;
var sand;
var horzTrans;
var horzTrans2;
var treesB;
var horzTrack;
var vertTrack;
var tlTurn;
var blTurn;
var trTurn;
var brTurn;
var trainHead;
var smoke;
var smallTrain;
var medTrain;
var largeTrain;
var fuelCart;
var cargoCart;
var passangerCart;
var trainScale;
var trainCurrPos = 0;
var trainRoute = [];
var trainRouteSize;
var trainSpeed = 1;
var gridSize = 15;
var trackSize = 10;
var cartScale = 0.20;
var cartFollowingDistance;
var locomotiveChoice;
var cartsBought = []; //Everytime a user buys a cart it must be added to this array
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
function loadAllImages() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass1.png')];
                case 1:
                    grass = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionE.png')];
                case 2:
                    vertTrans = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionW.png')];
                case 3:
                    vertTrans2 = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileSand1.png')];
                case 4:
                    sand = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionS.png')];
                case 5:
                    horzTrans = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/tileGrass_transitionN.png')];
                case 6:
                    horzTrans2 = _a.sent();
                    return [4 /*yield*/, loadImage('./images/gameGrid/treeBrown_large.png')];
                case 7:
                    treesB = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/horzTrack.png')];
                case 8:
                    horzTrack = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/vertTrack2.png')];
                case 9:
                    vertTrack = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/topLeftTurn.png')];
                case 10:
                    tlTurn = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/bottomLeftTurn.png')];
                case 11:
                    blTurn = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/topRightTurn.png')];
                case 12:
                    trTurn = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainTracks/bottomRightTurn.png')];
                case 13:
                    brTurn = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/locomotiveSmall.png')];
                case 14:
                    smallTrain = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/locomotiveMedium.png')];
                case 15:
                    medTrain = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/locomotiveLarge.png')];
                case 16:
                    largeTrain = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/fuelCart.png')];
                case 17:
                    fuelCart = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/cargoCart.png')];
                case 18:
                    cargoCart = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/passangerCart.png')];
                case 19:
                    passangerCart = _a.sent();
                    return [4 /*yield*/, loadImage('./images/trainParts/smoke.png')];
                case 20:
                    smoke = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function loadTrainRoute() {
    return __awaiter(this, void 0, void 0, function () {
        var trainIncrements, x, y, x, y, x, y, y, y, x, y, x, y, x, y;
        return __generator(this, function (_a) {
            trainIncrements = 0.5;
            for (x = 0; x < 0.25 * canvas.width; x = x + trainIncrements) {
                trainRoute.push([x, 0.1 * canvas.height, 1.5708]);
            }
            for (y = 0.1 * canvas.height + 2 * trackSize; y < 0.5 * canvas.height; y = y + trainIncrements) {
                trainRoute.push([0.25 * canvas.width + trackSize, y, 3.14]);
            }
            for (x = 0.25 * canvas.width; x > 0.05 * canvas.width; x = x - trainIncrements) {
                trainRoute.push([x, 0.5 * canvas.height + trackSize, 4.71]);
            }
            for (y = 0.5 * canvas.height + trackSize; y < 0.85 * canvas.height; y = y + trainIncrements) {
                trainRoute.push([0.05 * canvas.width + trackSize, y, 3.14]);
            }
            for (x = 0.05 + 2 * trackSize; x < 0.45 * canvas.width; x = x + trainIncrements) {
                trainRoute.push([x, 0.85 * canvas.height, 1.5708]);
            }
            for (y = 0.85 * canvas.height + trackSize; y < canvas.height; y = y + trainIncrements) {
                trainRoute.push([0.45 * canvas.width + trackSize, y, 3.14]);
            }
            for (y = 1; y < 50; y = y + trainIncrements) {
                trainRoute.push([0, 0, -99]);
            }
            //Second half of route
            for (y = 0; y < 0.4 * canvas.height; y = y + trainIncrements) {
                trainRoute.push([0.5 * canvas.width + trackSize, y, 3.14]);
            }
            for (x = 0.5 * canvas.width + trackSize; x < 0.65 * canvas.width; x = x + trainIncrements) {
                trainRoute.push([x, 0.4 * canvas.height, 1.57]);
            }
            for (y = 0.4 * canvas.height + trackSize; y < 0.9 * canvas.height; y = y + trainIncrements) {
                trainRoute.push([0.65 * canvas.width + trackSize, y, 3.14]);
            }
            for (x = 0.65 * canvas.width + trackSize; x < 0.8 * canvas.width; x = x + trainIncrements) {
                trainRoute.push([x, 0.9 * canvas.height, 1.57]);
            }
            for (y = 0.9 * canvas.height; y > 0.2 * canvas.height; y = y - trainIncrements) {
                trainRoute.push([0.8 * canvas.width, y, 0]);
            }
            for (x = 0.8 * canvas.width + trackSize; x < canvas.width; x = x + trainIncrements) {
                trainRoute.push([x, 0.2 * canvas.height, 1.57]);
            }
            for (y = 1; y < 50; y = y + trainIncrements) {
                trainRoute.push([0, 0, -99]);
            }
            trainRouteSize = trainRoute.length;
            return [2 /*return*/];
        });
    });
}
function setupComponents() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pixelSizeX = windowWidth / defaultWidth;
                    pixelSizeY = windowHeight / defaultHeight;
                    canvas = document.getElementById('canvas');
                    ctx = canvas.getContext("2d");
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    return [4 /*yield*/, loadAllImages()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, loadTrainRoute()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function drawGrass() {
    return __awaiter(this, void 0, void 0, function () {
        var y, x, y, x;
        return __generator(this, function (_a) {
            //Top Left Grass
            for (y = 0; y < 0.6 * canvas.height; y = y + gridSize) {
                for (x = 0; x < 0.3 * canvas.width; x = x + gridSize) {
                    ctx.drawImage(grass, x, y, gridSize, gridSize);
                }
            }
            //Right Grass
            for (y = 0.2 * canvas.height; y < canvas.height; y = y + gridSize) {
                for (x = 0.7 * canvas.width; x < canvas.width; x = x + gridSize) {
                    ctx.drawImage(grass, x, y, gridSize, gridSize);
                }
            }
            return [2 /*return*/];
        });
    });
}
function drawSand() {
    return __awaiter(this, void 0, void 0, function () {
        var y, x, x, y, x;
        return __generator(this, function (_a) {
            //Left Bottom Sand
            for (y = 0.7 * canvas.height; y < canvas.height; y = y + gridSize) {
                for (x = 0; x < 0.3 * canvas.width + gridSize; x = x + gridSize) {
                    ctx.drawImage(sand, x, y, gridSize, gridSize);
                }
            }
            //middle sand
            for (x = 0.3 * canvas.width + gridSize; x < 0.7 * canvas.width; x = x + gridSize) {
                for (y = 0; y < canvas.height; y = y + gridSize) {
                    ctx.drawImage(sand, x, y, gridSize, gridSize);
                }
            }
            //top right sand
            for (x = 0.7 * canvas.width; x < canvas.width; x = x + gridSize) {
                ctx.drawImage(sand, x, 0, gridSize, gridSize);
            }
            return [2 /*return*/];
        });
    });
}
function drawTransitions() {
    return __awaiter(this, void 0, void 0, function () {
        var y, y, x, x;
        return __generator(this, function (_a) {
            //First Vertical Transition
            for (y = 0; y < 0.6 * canvas.height; y = y + gridSize) {
                ctx.drawImage(vertTrans, 0.3 * canvas.width, y, gridSize, gridSize);
            }
            // Top right Vertical Transition
            for (y = 0.2 * canvas.height; y < canvas.height; y = y + gridSize) {
                ctx.drawImage(vertTrans2, 0.7 * canvas.width, y, gridSize, gridSize);
            }
            // //First Horizontal Transition
            for (x = 0; x < 0.3 * canvas.width; x = x + gridSize) {
                ctx.drawImage(horzTrans, x, 0.6 * canvas.height, gridSize, gridSize);
            }
            //Top right Horizontal Transition
            for (x = 0.7 * canvas.width + gridSize; x < canvas.width; x = x + gridSize) {
                ctx.drawImage(horzTrans2, x, (0.2 * canvas.height - gridSize), gridSize, gridSize);
            }
            // //Twigs or trees
            ctx.drawImage(treesB, 0.3 * canvas.width, 0.6 * canvas.height, gridSize, gridSize);
            ctx.drawImage(treesB, 0.7 * canvas.width, 0.2 * canvas.height - gridSize, gridSize, gridSize);
            return [2 /*return*/];
        });
    });
}
function drawTracks() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, x, y, x, y, x, y, x, y, x;
        return __generator(this, function (_a) {
            for (x = 0; x < 0.25 * canvas.width; x = x + trackSize) {
                ctx.drawImage(horzTrack, x, 0.1 * canvas.height, trackSize, trackSize);
            }
            ctx.drawImage(tlTurn, 0.25 * canvas.width, 0.1 * canvas.height, trackSize, trackSize);
            for (y = 0.1 * canvas.height + trackSize; y < 0.5 * canvas.height; y = y + trackSize) {
                ctx.drawImage(vertTrack, 0.25 * canvas.width, y, trackSize, trackSize);
            }
            ctx.drawImage(blTurn, 0.25 * canvas.width, 0.5 * canvas.height, trackSize, trackSize);
            for (x = 0.25 * canvas.width - trackSize; x > 0.05 * canvas.width; x = x - trackSize) {
                ctx.drawImage(horzTrack, x, 0.5 * canvas.height, trackSize, trackSize);
            }
            ctx.drawImage(trTurn, 0.05 * canvas.width, 0.5 * canvas.height, trackSize, trackSize);
            for (y = 0.5 * canvas.height + trackSize; y < 0.85 * canvas.height; y = y + trackSize) {
                ctx.drawImage(vertTrack, 0.05 * canvas.width, y, trackSize, trackSize);
            }
            ctx.drawImage(brTurn, 0.05 * canvas.width, 0.85 * canvas.height, trackSize, trackSize);
            for (x = 0.05 * canvas.width + trackSize; x < 0.45 * canvas.width; x = x + trackSize) {
                ctx.drawImage(horzTrack, x, 0.85 * canvas.height, trackSize, trackSize);
            }
            ctx.drawImage(tlTurn, 0.45 * canvas.width, 0.85 * canvas.height, trackSize, trackSize);
            ctx.drawImage(vertTrack, 0.45 * canvas.width, 0.85 * canvas.height + trackSize, trackSize, trackSize);
            ctx.drawImage(vertTrack, 0.45 * canvas.width, 0.85 * canvas.height + 2 * trackSize, trackSize, trackSize);
            //Second half of track
            for (y = 0; y < 0.4 * canvas.height; y = y + trackSize) {
                ctx.drawImage(vertTrack, 0.5 * canvas.width, y, trackSize, trackSize);
            }
            ctx.drawImage(brTurn, 0.5 * canvas.width, 0.4 * canvas.height, trackSize, trackSize);
            for (x = 0.5 * canvas.width + trackSize; x < 0.65 * canvas.width; x = x + trackSize) {
                ctx.drawImage(horzTrack, x, 0.4 * canvas.height, trackSize, trackSize);
            }
            ctx.drawImage(tlTurn, 0.65 * canvas.width, 0.4 * canvas.height, trackSize, trackSize);
            for (y = 0.4 * canvas.height + trackSize; y < 0.9 * canvas.height; y = y + trackSize) {
                ctx.drawImage(vertTrack, 0.65 * canvas.width, y, trackSize, trackSize);
            }
            ctx.drawImage(brTurn, 0.65 * canvas.width, 0.9 * canvas.height, trackSize, trackSize);
            for (x = 0.65 * canvas.width + trackSize; x < 0.8 * canvas.width; x = x + trackSize) {
                ctx.drawImage(horzTrack, x, 0.9 * canvas.height, trackSize, trackSize);
            }
            ctx.drawImage(blTurn, 0.8 * canvas.width, 0.9 * canvas.height, trackSize, trackSize);
            for (y = 0.9 * canvas.height - trackSize; y > 0.2 * canvas.height; y = y - trackSize) {
                ctx.drawImage(vertTrack, 0.8 * canvas.width, y, trackSize, trackSize);
            }
            ctx.drawImage(trTurn, 0.8 * canvas.width, 0.2 * canvas.height, trackSize, trackSize);
            for (x = 0.8 * canvas.width + trackSize; x < canvas.width; x = x + trackSize) {
                ctx.drawImage(horzTrack, x, 0.2 * canvas.height, trackSize, trackSize);
            }
            return [2 /*return*/];
        });
    });
}
function drawImageRotated(image, x, y, scale, rotation) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // ctx.setTransform(scale, 0, 0, scale, 0, 0); // sets scale and origin
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);
            ctx.drawImage(image, -15, -15);
            ctx.setTransform(1, 0, 0, 1, 0, 0); //resets transform
            return [2 /*return*/];
        });
    });
}
function drawTrain() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, cartPosition, firstCartPos, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (trainHead == undefined) {
                        return [2 /*return*/];
                    }
                    if (trainCurrPos >= trainRouteSize - 1) {
                        trainCurrPos = 0;
                        trainTimer = 0;
                    }
                    if (trainTimer % trainSpeed == 0) {
                        trainCurrPos += 1;
                    }
                    if (trainRoute[trainCurrPos][2] == -99) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, drawImageRotated(trainHead, trainRoute[trainCurrPos][0], trainRoute[trainCurrPos][1], trainScale, trainRoute[trainCurrPos][2])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, drawImageRotated(smoke, trainRoute[trainCurrPos][0], trainRoute[trainCurrPos][1], 0.1, trainRoute[trainCurrPos][2])];
                case 2:
                    _a.sent();
                    firstCartPos = 0;
                    for (index = 0; index < cartsBought.length; index++) {
                        cart = cartsBought[index];
                        if (index == 0) {
                            cartPosition = trainCurrPos - ((index + 1) * cartFollowingDistance);
                            firstCartPos = trainCurrPos - ((index + 1) * cartFollowingDistance);
                        }
                        else {
                            cartPosition = firstCartPos - ((index) * 30);
                        }
                        if (cartPosition > 0) {
                            drawImageRotated(cart, trainRoute[cartPosition][0], trainRoute[cartPosition][1], cartScale, trainRoute[cartPosition][2]);
                        }
                    }
                    trainTimer += 1;
                    return [2 /*return*/];
            }
        });
    });
}
function drawGame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, drawGrass()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, drawSand()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, drawTransitions()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, drawTracks()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, drawTrain()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateTrain(trainsInfo) {
    console.log(trainsInfo);
}
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, setupComponents()];
            case 1:
                _a.sent();
                window.requestAnimationFrame(eventLoop);
                return [2 /*return*/];
        }
    });
}); });
function eventLoop(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    // console.log(timeStamp);
    if (!gameDone) {
        // window.setTimeout(eventLoop, intervalTime); 
        window.requestAnimationFrame(eventLoop);
    }
}
