let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let windowWidth: number;
let windowHeight: number;
let canvasScreenRatio: number = 0.80;

let gameDone:boolean = false;
let trainTimer = 0;

let grass:CanvasImageSource;
let vertTrans:CanvasImageSource;
let vertTrans2:CanvasImageSource;
let sand:CanvasImageSource;
let horzTrans:CanvasImageSource;
let horzTrans2:CanvasImageSource;
let treesB:CanvasImageSource;

let horzTrack:CanvasImageSource;
let vertTrack:CanvasImageSource;
let tlTurn:CanvasImageSource;
let blTurn:CanvasImageSource;
let trTurn:CanvasImageSource;
let brTurn:CanvasImageSource;

let trainHead:CanvasImageSource;
let trainScale: number = 0.4;
// let grass:CanvasImageSource;
// let grass:CanvasImageSource;
// let grass:CanvasImageSource;


let trainCurrPos:number = 0;
let trainRoute: number[][] = [];
let trainRouteSize:number;
let trainSpeed:number =2;


//TODO: see how I autoresized canvas from prev project
function loadImage(url:string):Promise<CanvasImageSource>
{
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
          resolve(image);
        });
        image.addEventListener('error', reject);
        image.src = url;
      });
}

async function loadAllImages()
{
    grass= await loadImage('./images/gameGrid/tileGrass1.png');
    vertTrans = await loadImage('./images/gameGrid/tileGrass_transitionE.png');
    vertTrans2 = await loadImage('./images/gameGrid/tileGrass_transitionW.png');
    sand= await loadImage('./images/gameGrid/tileSand1.png');
    horzTrans = await loadImage('./images/gameGrid/tileGrass_transitionS.png');
    horzTrans2 = await loadImage('./images/gameGrid/tileGrass_transitionN.png');
    treesB = await loadImage('./images/gameGrid/treeBrown_large.png');

    horzTrack = await loadImage('./images/trainTracks/horzTrack.png');
    vertTrack = await loadImage('./images/trainTracks/vertTrack2.png');
    tlTurn = await loadImage('./images/trainTracks/topLeftTurn.png');
    blTurn = await loadImage('./images/trainTracks/bottomLeftTurn.png');
    trTurn = await loadImage('./images/trainTracks/topRightTurn.png');
    brTurn = await loadImage('./images/trainTracks/bottomRightTurn.png');

    trainHead = await loadImage('./images/trainParts/tankBody_bigRed_outline.png');

}

async function loadTrainRoute()
{
    trainRoute.push([20,65.0,1.5708]);
    trainRoute.push([22,65.0,1.5708]);
    trainRoute.push([24,65.0,1.5708]);
    trainRoute.push([26,65.0,1.5708]);
    trainRoute.push([28,65.0,1.5708]);
    trainRoute.push([30,65.0,1.5708]);
    trainRoute.push([32,65.0,1.5708]);
    trainRoute.push([34,65.0,1.5708]);
    trainRoute.push([36,65.0,1.5708]);
    trainRoute.push([38,65.0,1.5708]);
    trainRoute.push([40,65.0,1.5708]);
    trainRoute.push([42,65.0,1.5708]);
    trainRoute.push([44,65.0,1.5708]);
    trainRoute.push([46,65.0,1.5708]);
    trainRoute.push([48,65.0,1.5708]);
    trainRoute.push([50,65.0,1.5708]);
    trainRoute.push([52,65.0,1.5708]);
    trainRoute.push([54,65.0,1.5708]);
    trainRoute.push([56,65.0,1.5708]);
    trainRoute.push([58,65.0,1.5708]);
    trainRoute.push([60,65.0,1.5708]);
    trainRoute.push([62,65.0,1.5708]);
    trainRoute.push([64,65.0,1.5708]);
    trainRoute.push([66,65.0,1.5708]);
    trainRoute.push([68,65.0,1.5708]);
    trainRoute.push([70,65.0,1.5708]);
    trainRoute.push([72,65.0,1.5708]);
    trainRoute.push([74,65.0,1.5708]);
    trainRoute.push([76,65.0,1.5708]);
    trainRoute.push([78,65.0,1.5708]);
    trainRoute.push([80,65.0,1.5708]);
    trainRoute.push([82,65.0,1.5708]);
    trainRoute.push([84,65.0,1.5708]);
    trainRoute.push([86,65.0,1.5708]);
    trainRoute.push([88,65.0,1.5708]);
    trainRoute.push([90,65.0,1.5708]);
    trainRoute.push([92,65.0,1.5708]);
    trainRoute.push([94,65.0,1.5708]);
    trainRoute.push([96,65.0,1.5708]);
    trainRoute.push([98,65.0,1.5708]);
    trainRoute.push([100,65.0,1.5708]);
    trainRoute.push([102,65.0,1.5708]);
    trainRoute.push([104,65.0,1.5708]);
    trainRoute.push([106,65.0,1.5708]);
    trainRoute.push([108,65.0,1.5708]);
    trainRoute.push([110,65.0,1.5708]);
    trainRoute.push([112,65.0,1.5708]);
    trainRoute.push([114,65.0,1.5708]);
    trainRoute.push([116,65.0,1.5708]);
    trainRoute.push([118,65.0,1.5708]);
    trainRoute.push([120,65.0,1.5708]);
    trainRoute.push([122,65.0,1.5708]);
    trainRoute.push([124,65.0,1.5708]);
    trainRoute.push([126,65.0,1.5708]);
    trainRoute.push([128,65.0,1.5708]);
    trainRoute.push([130,65.0,1.5708]);
    trainRoute.push([132,65.0,1.5708]);
    trainRoute.push([134,65.0,1.5708]);
    trainRoute.push([136,65.0,1.5708]);
    trainRoute.push([138,65.0,1.5708]);
    trainRoute.push([140,65.0,1.5708]);
    trainRoute.push([142,65.0,1.5708]);
    trainRoute.push([144,65.0,1.5708]);
    trainRoute.push([146,65.0,1.5708]);
    trainRoute.push([148,65.0,1.5708]);
    trainRoute.push([150,65.0,1.5708]);
    trainRoute.push([152,65.0,1.5708]);
    trainRoute.push([154,65.0,1.5708]);
    trainRoute.push([156,65.0,1.5708]);
    trainRoute.push([158,65.0,1.5708]);
    trainRoute.push([160,65.0,1.5708]);
    trainRoute.push([162,65.0,1.5708]);
    trainRoute.push([164,65.0,1.5708]);
    trainRoute.push([166,65.0,1.5708]);
    trainRoute.push([168,65.0,1.5708]);
    trainRoute.push([170,65.0,1.5708]);
    trainRoute.push([172,65.0,1.5708]);
    trainRoute.push([174,65.0,1.5708]);
    trainRoute.push([176,65.0,1.5708]);
    trainRoute.push([178,65.0,1.5708]);
    trainRoute.push([180,65.0,1.5708]);
    trainRoute.push([182,65.0,1.5708]);
    trainRoute.push([184,65.0,1.5708]);
    trainRoute.push([186,65.0,1.5708]);
    trainRoute.push([188,65.0,1.5708]);
    trainRoute.push([190,65.0,1.5708]);
    trainRoute.push([192,65.0,1.5708]);
    trainRoute.push([194,65.0,1.5708]);
    trainRoute.push([196,65.0,1.5708]);
    trainRoute.push([198,65.0,1.5708]);
    trainRoute.push([200,65.0,1.5708]);
    trainRoute.push([202,65.0,1.5708]);
    trainRoute.push([204,65.0,1.5708]);
    trainRoute.push([206,65.0,1.5708]);
    trainRoute.push([208,65.0,1.5708]);
    trainRoute.push([210,65.0,1.5708]);
    trainRoute.push([212,65.0,1.5708]);
    trainRoute.push([214,65.0,1.5708]);
    trainRoute.push([216,65.0,1.5708]);
    trainRoute.push([218,65.0,1.5708]);
    trainRoute.push([220,65.0,1.5708]);
    trainRoute.push([222,65.0,1.5708]);
    trainRoute.push([224,65.0,1.5708]);
    trainRoute.push([226,65.0,1.5708]);
    trainRoute.push([228,65.0,1.5708]);
    trainRoute.push([230,65.0,1.5708]);
    trainRoute.push([232,65.0,1.5708]);
    trainRoute.push([234,65.0,1.5708]);
    trainRoute.push([236,65.0,1.5708]);
    trainRoute.push([238,65.0,1.5708]);
    trainRoute.push([240,65.0,1.5708]);
    trainRoute.push([242,65.0,1.5708]);
    trainRoute.push([244,65.0,1.5708]);
    trainRoute.push([245,66.0,1.65]);
    trainRoute.push([246,67.0,1.65]);
    trainRoute.push([247,68.0,1.65]);
    trainRoute.push([248,69.0,1.7999999999999998]);
    trainRoute.push([249,70.0,1.7999999999999998]);
    trainRoute.push([250,71.0,1.7999999999999998]);
    trainRoute.push([251,72.0,1.9499999999999997]);
    trainRoute.push([252,73.0,1.9499999999999997]);
    trainRoute.push([253,74.0,1.9499999999999997]);
    trainRoute.push([254,75.0,2.0999999999999996]);
    trainRoute.push([255,76.0,2.0999999999999996]);
    trainRoute.push([256,77.0,2.0999999999999996]);
    trainRoute.push([257,78.0,2.2499999999999996]);
    trainRoute.push([258,79.0,2.2499999999999996]);
    trainRoute.push([259,80.0,2.2499999999999996]);
    trainRoute.push([260,81.0,2.3999999999999995]);
    trainRoute.push([261,82.0,2.3999999999999995]);
    trainRoute.push([262,83.0,2.3999999999999995]);
    trainRoute.push([263,84.0,2.5499999999999994]);
    trainRoute.push([264,85.0,2.5499999999999994]);
    trainRoute.push([265,86.0,2.5499999999999994]);
    trainRoute.push([266,87.0,2.6999999999999993]);
    trainRoute.push([267,88.0,2.6999999999999993]);
    trainRoute.push([268,89.0,2.6999999999999993]);
    trainRoute.push([269,90.0,2.849999999999999]);
    trainRoute.push([270,91.0,2.849999999999999]);
    trainRoute.push([271,92.0,2.849999999999999]);
    trainRoute.push([272,93.0,2.999999999999999]);
    trainRoute.push([273,94.0,2.999999999999999]);
    trainRoute.push([274,95.0,2.999999999999999]);
    trainRoute.push([274,95,3.14]);
    trainRoute.push([274,97,3.14]);
    trainRoute.push([274,99,3.14]);
    trainRoute.push([274,101,3.14]);
    trainRoute.push([274,103,3.14]);
    trainRoute.push([274,105,3.14]);
    trainRoute.push([274,107,3.14]);
    trainRoute.push([274,109,3.14]);
    trainRoute.push([274,111,3.14]);
    trainRoute.push([274,113,3.14]);
    trainRoute.push([274,115,3.14]);
    trainRoute.push([274,117,3.14]);
    trainRoute.push([274,119,3.14]);
    trainRoute.push([274,121,3.14]);
    trainRoute.push([274,123,3.14]);
    trainRoute.push([274,125,3.14]);
    trainRoute.push([274,127,3.14]);
    trainRoute.push([274,129,3.14]);
    trainRoute.push([274,131,3.14]);
    trainRoute.push([274,133,3.14]);
    trainRoute.push([274,135,3.14]);
    trainRoute.push([274,137,3.14]);
    trainRoute.push([274,139,3.14]);
    trainRoute.push([274,141,3.14]);
    trainRoute.push([274,143,3.14]);
    trainRoute.push([274,145,3.14]);
    trainRoute.push([274,147,3.14]);
    trainRoute.push([274,149,3.14]);
    trainRoute.push([274,151,3.14]);
    trainRoute.push([274,153,3.14]);
    trainRoute.push([274,155,3.14]);
    trainRoute.push([274,157,3.14]);
    trainRoute.push([274,159,3.14]);
    trainRoute.push([274,161,3.14]);
    trainRoute.push([274,163,3.14]);
    trainRoute.push([274,165,3.14]);
    trainRoute.push([274,167,3.14]);
    trainRoute.push([274,169,3.14]);
    trainRoute.push([274,171,3.14]);
    trainRoute.push([274,173,3.14]);
    trainRoute.push([274,175,3.14]);
    trainRoute.push([274,177,3.14]);
    trainRoute.push([274,179,3.14]);
    trainRoute.push([274,181,3.14]);
    trainRoute.push([274,183,3.14]);
    trainRoute.push([274,185,3.14]);
    trainRoute.push([274,187,3.14]);
    trainRoute.push([274,189,3.14]);
    trainRoute.push([274,191,3.14]);
    trainRoute.push([274,193,3.14]);
    trainRoute.push([274,195,3.14]);
    trainRoute.push([274,197,3.14]);
    trainRoute.push([274,199,3.14]);
    trainRoute.push([274,201,3.14]);
    trainRoute.push([274,203,3.14]);
    trainRoute.push([274,205,3.14]);
    trainRoute.push([274,207,3.14]);
    trainRoute.push([274,209,3.14]);
    trainRoute.push([274,211,3.14]);
    trainRoute.push([273,212,3.149999999999999]);
    trainRoute.push([272,213,3.149999999999999]);
    trainRoute.push([271,214,3.149999999999999]);
    trainRoute.push([270,215,3.299999999999999]);
    trainRoute.push([269,216,3.299999999999999]);
    trainRoute.push([268,217,3.299999999999999]);
    trainRoute.push([267,218,3.449999999999999]);
    trainRoute.push([266,219,3.449999999999999]);
    trainRoute.push([265,220,3.449999999999999]);
    trainRoute.push([264,221,3.5999999999999988]);
    trainRoute.push([263,222,3.5999999999999988]);
    trainRoute.push([262,223,3.5999999999999988]);
    trainRoute.push([261,224,3.7499999999999987]);
    trainRoute.push([260,225,3.7499999999999987]);
    trainRoute.push([259,226,3.7499999999999987]);
    trainRoute.push([258,227,3.8999999999999986]);
    trainRoute.push([257,228,3.8999999999999986]);
    trainRoute.push([256,229,3.8999999999999986]);
    trainRoute.push([255,230,4.049999999999999]);
    trainRoute.push([254,231,4.049999999999999]);
    trainRoute.push([253,232,4.049999999999999]);
    trainRoute.push([252,233,4.199999999999999]);
    trainRoute.push([251,234,4.199999999999999]);
    trainRoute.push([250,235,4.199999999999999]);
    trainRoute.push([249,236,4.35]);
    trainRoute.push([248,237,4.35]);
    trainRoute.push([247,238,4.35]);
    trainRoute.push([246,239,4.5]);
    trainRoute.push([245,240,4.5]);
    trainRoute.push([244,241,4.5]);
    trainRoute.push([243,242,4.65]);
    trainRoute.push([242,243,4.65]);
    trainRoute.push([241,244,4.65]);
    trainRoute.push([241,244,4.71]);
    trainRoute.push([239,244,4.71]);
    trainRoute.push([237,244,4.71]);
    trainRoute.push([235,244,4.71]);
    trainRoute.push([233,244,4.71]);
    trainRoute.push([231,244,4.71]);
    trainRoute.push([229,244,4.71]);
    trainRoute.push([227,244,4.71]);
    trainRoute.push([225,244,4.71]);
    trainRoute.push([223,244,4.71]);
    trainRoute.push([221,244,4.71]);
    trainRoute.push([219,244,4.71]);
    trainRoute.push([217,244,4.71]);
    trainRoute.push([215,244,4.71]);
    trainRoute.push([213,244,4.71]);
    trainRoute.push([211,244,4.71]);
    trainRoute.push([209,244,4.71]);
    trainRoute.push([207,244,4.71]);
    trainRoute.push([205,244,4.71]);
    trainRoute.push([203,244,4.71]);
    trainRoute.push([201,244,4.71]);
    trainRoute.push([199,244,4.71]);
    trainRoute.push([197,244,4.71]);
    trainRoute.push([195,244,4.71]);
    trainRoute.push([193,244,4.71]);
    trainRoute.push([191,244,4.71]);
    trainRoute.push([189,244,4.71]);
    trainRoute.push([187,244,4.71]);
    trainRoute.push([185,244,4.71]);
    trainRoute.push([183,244,4.71]);
    trainRoute.push([181,244,4.71]);
    trainRoute.push([179,244,4.71]);
    trainRoute.push([177,244,4.71]);
    trainRoute.push([175,244,4.71]);
    trainRoute.push([173,244,4.71]);
    trainRoute.push([171,244,4.71]);
    trainRoute.push([169,244,4.71]);
    trainRoute.push([167,244,4.71]);
    trainRoute.push([165,244,4.71]);
    trainRoute.push([163,244,4.71]);
    trainRoute.push([161,244,4.71]);
    trainRoute.push([159,244,4.71]);
    trainRoute.push([157,244,4.71]);
    trainRoute.push([155,244,4.71]);
    trainRoute.push([153,244,4.71]);
    trainRoute.push([151,244,4.71]);
    trainRoute.push([149,244,4.71]);
    trainRoute.push([147,244,4.71]);
    trainRoute.push([145,244,4.71]);
    trainRoute.push([143,244,4.71]);
    trainRoute.push([141,244,4.71]);
    trainRoute.push([139,244,4.71]);
    trainRoute.push([137,244,4.71]);
    trainRoute.push([135,244,4.71]);
    trainRoute.push([133,244,4.71]);
    trainRoute.push([131,244,4.71]);
    trainRoute.push([129,244,4.71]);
    trainRoute.push([127,244,4.71]);
    trainRoute.push([125,244,4.71]);
    trainRoute.push([123,244,4.71]);
    trainRoute.push([121,244,4.71]);
    trainRoute.push([119,244,4.71]);
    trainRoute.push([117,244,4.71]);
    trainRoute.push([115,244,4.71]);
    trainRoute.push([113,244,4.71]);
    trainRoute.push([111,244,4.71]);
    trainRoute.push([109,244,4.71]);
    trainRoute.push([107,244,4.71]);
    trainRoute.push([105,244,4.71]);
    trainRoute.push([103,244,4.71]);
    trainRoute.push([101,244,4.71]);
    trainRoute.push([99,244,4.71]);
    trainRoute.push([97,244,4.71]);
    trainRoute.push([95,244,4.71]);
    trainRoute.push([93,244,4.71]);
    trainRoute.push([91,244,4.71]);
    trainRoute.push([89,244,4.71]);
    trainRoute.push([87,244,4.71]);
    trainRoute.push([85,244,4.71]);
    trainRoute.push([83,244,4.71]);
    trainRoute.push([81,244,4.71]);
    trainRoute.push([79,244,4.71]);
    trainRoute.push([77,244,4.71]);
    trainRoute.push([75,244,4.71]);
    trainRoute.push([73,244,4.71]);
    trainRoute.push([71,244,4.71]);
    trainRoute.push([70.7,244.3,4.800000000000001]);
    trainRoute.push([70.4,244.60000000000002,4.800000000000001]);
    trainRoute.push([70.10000000000001,244.90000000000003,4.800000000000001]);
    trainRoute.push([69.80000000000001,245.20000000000005,4.800000000000001]);
    trainRoute.push([69.50000000000001,245.50000000000006,4.550000000000001]);
    trainRoute.push([69.20000000000002,245.80000000000007,4.550000000000001]);
    trainRoute.push([68.90000000000002,246.10000000000008,4.550000000000001]);
    trainRoute.push([68.60000000000002,246.4000000000001,4.550000000000001]);
    trainRoute.push([68.30000000000003,246.7000000000001,4.300000000000001]);
    trainRoute.push([68.00000000000003,247.0000000000001,4.300000000000001]);
    trainRoute.push([67.70000000000003,247.30000000000013,4.300000000000001]);
    trainRoute.push([67.40000000000003,247.60000000000014,4.300000000000001]);
    trainRoute.push([67.10000000000004,247.90000000000015,4.050000000000001]);
    trainRoute.push([66.80000000000004,248.20000000000016,4.050000000000001]);
    trainRoute.push([66.50000000000004,248.50000000000017,4.050000000000001]);
    trainRoute.push([66.20000000000005,248.80000000000018,4.050000000000001]);
    trainRoute.push([65.90000000000005,249.1000000000002,3.8000000000000007]);
    trainRoute.push([65.60000000000005,249.4000000000002,3.8000000000000007]);
    trainRoute.push([65.30000000000005,249.70000000000022,3.8000000000000007]);
    trainRoute.push([65.00000000000006,250.00000000000023,3.8000000000000007]);
    trainRoute.push([64.70000000000006,250.30000000000024,3.5500000000000007]);
    trainRoute.push([64.40000000000006,250.60000000000025,3.5500000000000007]);
    trainRoute.push([64.10000000000007,250.90000000000026,3.5500000000000007]);
    trainRoute.push([63.80000000000007,251.20000000000027,3.5500000000000007]);
    trainRoute.push([63.50000000000007,251.50000000000028,3.3000000000000007]);
    trainRoute.push([63.200000000000074,251.8000000000003,3.3000000000000007]);
    trainRoute.push([62.90000000000008,252.1000000000003,3.3000000000000007]);
    trainRoute.push([62.60000000000008,252.40000000000032,3.3000000000000007]);
    trainRoute.push([62.60000000000008,255,3.14]);
    trainRoute.push([62.60000000000008,257,3.14]);
    trainRoute.push([62.60000000000008,259,3.14]);
    trainRoute.push([62.60000000000008,261,3.14]);
    trainRoute.push([62.60000000000008,263,3.14]);
    trainRoute.push([62.60000000000008,265,3.14]);
    trainRoute.push([62.60000000000008,267,3.14]);
    trainRoute.push([62.60000000000008,269,3.14]);
    trainRoute.push([62.60000000000008,271,3.14]);
    trainRoute.push([62.60000000000008,273,3.14]);
    trainRoute.push([62.60000000000008,275,3.14]);
    trainRoute.push([62.60000000000008,277,3.14]);
    trainRoute.push([62.60000000000008,279,3.14]);
    trainRoute.push([62.60000000000008,281,3.14]);
    trainRoute.push([62.60000000000008,283,3.14]);
    trainRoute.push([62.60000000000008,285,3.14]);
    trainRoute.push([62.60000000000008,287,3.14]);
    trainRoute.push([62.60000000000008,289,3.14]);
    trainRoute.push([62.60000000000008,291,3.14]);
    trainRoute.push([62.60000000000008,293,3.14]);
    trainRoute.push([62.60000000000008,295,3.14]);
    trainRoute.push([62.60000000000008,297,3.14]);
    trainRoute.push([62.60000000000008,299,3.14]);
    trainRoute.push([62.60000000000008,301,3.14]);
    trainRoute.push([62.60000000000008,303,3.14]);
    trainRoute.push([62.60000000000008,305,3.14]);
    trainRoute.push([62.60000000000008,307,3.14]);
    trainRoute.push([62.60000000000008,309,3.14]);
    trainRoute.push([62.60000000000008,311,3.14]);
    trainRoute.push([62.60000000000008,313,3.14]);
    trainRoute.push([62.60000000000008,315,3.14]);
    trainRoute.push([62.60000000000008,317,3.14]);
    trainRoute.push([62.60000000000008,319,3.14]);
    trainRoute.push([62.60000000000008,321,3.14]);
    trainRoute.push([62.60000000000008,323,3.14]);
    trainRoute.push([62.60000000000008,325,3.14]);
    trainRoute.push([62.60000000000008,327,3.14]);
    trainRoute.push([62.60000000000008,329,3.14]);
    trainRoute.push([62.90000000000008,329.3,3.0500000000000007]);
    trainRoute.push([63.200000000000074,329.6,3.0500000000000007]);
    trainRoute.push([63.50000000000007,329.90000000000003,3.0500000000000007]);
    trainRoute.push([63.80000000000007,330.20000000000005,3.0500000000000007]);
    trainRoute.push([64.10000000000007,330.50000000000006,2.8000000000000007]);
    trainRoute.push([64.40000000000006,330.80000000000007,2.8000000000000007]);
    trainRoute.push([64.70000000000006,331.1000000000001,2.8000000000000007]);
    trainRoute.push([65.00000000000006,331.4000000000001,2.8000000000000007]);
    trainRoute.push([65.30000000000005,331.7000000000001,2.5500000000000007]);
    trainRoute.push([65.60000000000005,332.0000000000001,2.5500000000000007]);
    trainRoute.push([65.90000000000005,332.3000000000001,2.5500000000000007]);
    trainRoute.push([66.20000000000005,332.60000000000014,2.5500000000000007]);
    trainRoute.push([66.50000000000004,332.90000000000015,2.3000000000000007]);
    trainRoute.push([66.80000000000004,333.20000000000016,2.3000000000000007]);
    trainRoute.push([67.10000000000004,333.50000000000017,2.3000000000000007]);
    trainRoute.push([67.40000000000003,333.8000000000002,2.3000000000000007]);
    trainRoute.push([67.70000000000003,334.1000000000002,2.0500000000000007]);
    trainRoute.push([68.00000000000003,334.4000000000002,2.0500000000000007]);
    trainRoute.push([68.30000000000003,334.7000000000002,2.0500000000000007]);
    trainRoute.push([68.60000000000002,335.0000000000002,2.0500000000000007]);
    trainRoute.push([68.90000000000002,335.30000000000024,1.8000000000000007]);
    trainRoute.push([69.20000000000002,335.60000000000025,1.8000000000000007]);
    trainRoute.push([69.50000000000001,335.90000000000026,1.8000000000000007]);
    trainRoute.push([69.80000000000001,336.2000000000003,1.8000000000000007]);
    trainRoute.push([70,336.2000000000003,1.5708]);
    trainRoute.push([72,336.2000000000003,1.5708]);
    trainRoute.push([74,336.2000000000003,1.5708]);
    trainRoute.push([76,336.2000000000003,1.5708]);
    trainRoute.push([78,336.2000000000003,1.5708]);
    trainRoute.push([80,336.2000000000003,1.5708]);
    trainRoute.push([82,336.2000000000003,1.5708]);
    trainRoute.push([84,336.2000000000003,1.5708]);
    trainRoute.push([86,336.2000000000003,1.5708]);
    trainRoute.push([88,336.2000000000003,1.5708]);
    trainRoute.push([90,336.2000000000003,1.5708]);
    trainRoute.push([92,336.2000000000003,1.5708]);
    trainRoute.push([94,336.2000000000003,1.5708]);
    trainRoute.push([96,336.2000000000003,1.5708]);
    trainRoute.push([98,336.2000000000003,1.5708]);
    trainRoute.push([100,336.2000000000003,1.5708]);
    trainRoute.push([102,336.2000000000003,1.5708]);
    trainRoute.push([104,336.2000000000003,1.5708]);
    trainRoute.push([106,336.2000000000003,1.5708]);
    trainRoute.push([108,336.2000000000003,1.5708]);
    trainRoute.push([110,336.2000000000003,1.5708]);
    trainRoute.push([112,336.2000000000003,1.5708]);
    trainRoute.push([114,336.2000000000003,1.5708]);
    trainRoute.push([116,336.2000000000003,1.5708]);
    trainRoute.push([118,336.2000000000003,1.5708]);
    trainRoute.push([120,336.2000000000003,1.5708]);
    trainRoute.push([122,336.2000000000003,1.5708]);
    trainRoute.push([124,336.2000000000003,1.5708]);
    trainRoute.push([126,336.2000000000003,1.5708]);
    trainRoute.push([128,336.2000000000003,1.5708]);
    trainRoute.push([130,336.2000000000003,1.5708]);
    trainRoute.push([132,336.2000000000003,1.5708]);
    trainRoute.push([134,336.2000000000003,1.5708]);
    trainRoute.push([136,336.2000000000003,1.5708]);
    trainRoute.push([138,336.2000000000003,1.5708]);
    trainRoute.push([140,336.2000000000003,1.5708]);
    trainRoute.push([142,336.2000000000003,1.5708]);
    trainRoute.push([144,336.2000000000003,1.5708]);
    trainRoute.push([146,336.2000000000003,1.5708]);
    trainRoute.push([148,336.2000000000003,1.5708]);
    trainRoute.push([150,336.2000000000003,1.5708]);
    trainRoute.push([152,336.2000000000003,1.5708]);
    trainRoute.push([154,336.2000000000003,1.5708]);
    trainRoute.push([156,336.2000000000003,1.5708]);
    trainRoute.push([158,336.2000000000003,1.5708]);
    trainRoute.push([160,336.2000000000003,1.5708]);
    trainRoute.push([162,336.2000000000003,1.5708]);
    trainRoute.push([164,336.2000000000003,1.5708]);
    trainRoute.push([166,336.2000000000003,1.5708]);
    trainRoute.push([168,336.2000000000003,1.5708]);
    trainRoute.push([170,336.2000000000003,1.5708]);
    trainRoute.push([172,336.2000000000003,1.5708]);
    trainRoute.push([174,336.2000000000003,1.5708]);
    trainRoute.push([176,336.2000000000003,1.5708]);
    trainRoute.push([178,336.2000000000003,1.5708]);
    trainRoute.push([180,336.2000000000003,1.5708]);
    trainRoute.push([182,336.2000000000003,1.5708]);
    trainRoute.push([184,336.2000000000003,1.5708]);
    trainRoute.push([186,336.2000000000003,1.5708]);
    trainRoute.push([188,336.2000000000003,1.5708]);
    trainRoute.push([190,336.2000000000003,1.5708]);
    trainRoute.push([192,336.2000000000003,1.5708]);
    trainRoute.push([194,336.2000000000003,1.5708]);
    trainRoute.push([196,336.2000000000003,1.5708]);
    trainRoute.push([198,336.2000000000003,1.5708]);
    trainRoute.push([200,336.2000000000003,1.5708]);
    trainRoute.push([202,336.2000000000003,1.5708]);
    trainRoute.push([204,336.2000000000003,1.5708]);
    trainRoute.push([206,336.2000000000003,1.5708]);
    trainRoute.push([208,336.2000000000003,1.5708]);
    trainRoute.push([210,336.2000000000003,1.5708]);
    trainRoute.push([212,336.2000000000003,1.5708]);
    trainRoute.push([214,336.2000000000003,1.5708]);
    trainRoute.push([216,336.2000000000003,1.5708]);
    trainRoute.push([218,336.2000000000003,1.5708]);
    trainRoute.push([220,336.2000000000003,1.5708]);
    trainRoute.push([222,336.2000000000003,1.5708]);
    trainRoute.push([224,336.2000000000003,1.5708]);
    trainRoute.push([226,336.2000000000003,1.5708]);
    trainRoute.push([228,336.2000000000003,1.5708]);
    trainRoute.push([230,336.2000000000003,1.5708]);
    trainRoute.push([232,336.2000000000003,1.5708]);
    trainRoute.push([234,336.2000000000003,1.5708]);
    trainRoute.push([236,336.2000000000003,1.5708]);
    trainRoute.push([238,336.2000000000003,1.5708]);
    trainRoute.push([240,336.2000000000003,1.5708]);
    trainRoute.push([242,336.2000000000003,1.5708]);
    trainRoute.push([244,336.2000000000003,1.5708]);
    trainRoute.push([246,336.2000000000003,1.5708]);
    trainRoute.push([248,336.2000000000003,1.5708]);
    trainRoute.push([250,336.2000000000003,1.5708]);
    trainRoute.push([252,336.2000000000003,1.5708]);
    trainRoute.push([254,336.2000000000003,1.5708]);
    trainRoute.push([256,336.2000000000003,1.5708]);
    trainRoute.push([258,336.2000000000003,1.5708]);
    trainRoute.push([260,336.2000000000003,1.5708]);
    trainRoute.push([262,336.2000000000003,1.5708]);
    trainRoute.push([264,336.2000000000003,1.5708]);
    trainRoute.push([266,336.2000000000003,1.5708]);
    trainRoute.push([268,336.2000000000003,1.5708]);
    trainRoute.push([270,336.2000000000003,1.5708]);
    trainRoute.push([272,336.2000000000003,1.5708]);
    trainRoute.push([274,336.2000000000003,1.5708]);
    trainRoute.push([276,336.2000000000003,1.5708]);
    trainRoute.push([278,336.2000000000003,1.5708]);
    trainRoute.push([280,336.2000000000003,1.5708]);
    trainRoute.push([282,336.2000000000003,1.5708]);
    trainRoute.push([284,336.2000000000003,1.5708]);
    trainRoute.push([286,336.2000000000003,1.5708]);
    trainRoute.push([288,336.2000000000003,1.5708]);
    trainRoute.push([290,336.2000000000003,1.5708]);
    trainRoute.push([292,336.2000000000003,1.5708]);
    trainRoute.push([294,336.2000000000003,1.5708]);
    trainRoute.push([296,336.2000000000003,1.5708]);
    trainRoute.push([298,336.2000000000003,1.5708]);
    trainRoute.push([300,336.2000000000003,1.5708]);
    trainRoute.push([302,336.2000000000003,1.5708]);
    trainRoute.push([304,336.2000000000003,1.5708]);
    trainRoute.push([306,336.2000000000003,1.5708]);
    trainRoute.push([308,336.2000000000003,1.5708]);
    trainRoute.push([310,336.2000000000003,1.5708]);
    trainRoute.push([312,336.2000000000003,1.5708]);
    trainRoute.push([314,336.2000000000003,1.5708]);
    trainRoute.push([316,336.2000000000003,1.5708]);
    trainRoute.push([318,336.2000000000003,1.5708]);
    trainRoute.push([320,336.2000000000003,1.5708]);
    trainRoute.push([322,336.2000000000003,1.5708]);
    trainRoute.push([324,336.2000000000003,1.5708]);
    trainRoute.push([326,336.2000000000003,1.5708]);
    trainRoute.push([328,336.2000000000003,1.5708]);
    trainRoute.push([330,336.2000000000003,1.5708]);
    trainRoute.push([332,336.2000000000003,1.5708]);
    trainRoute.push([334,336.2000000000003,1.5708]);
    trainRoute.push([336,336.2000000000003,1.5708]);
    trainRoute.push([338,336.2000000000003,1.5708]);
    trainRoute.push([340,336.2000000000003,1.5708]);
    trainRoute.push([342,336.2000000000003,1.5708]);
    trainRoute.push([344,336.2000000000003,1.5708]);
    trainRoute.push([346,336.2000000000003,1.5708]);
    trainRoute.push([348,336.2000000000003,1.5708]);
    trainRoute.push([350,336.2000000000003,1.5708]);
    trainRoute.push([352,336.2000000000003,1.5708]);
    trainRoute.push([354,336.2000000000003,1.5708]);
    trainRoute.push([356,336.2000000000003,1.5708]);
    trainRoute.push([358,336.2000000000003,1.5708]);
    trainRoute.push([360,336.2000000000003,1.5708]);
    trainRoute.push([362,336.2000000000003,1.5708]);
    trainRoute.push([364,336.2000000000003,1.5708]);
    trainRoute.push([366,336.2000000000003,1.5708]);
    trainRoute.push([368,336.2000000000003,1.5708]);
    trainRoute.push([370,336.2000000000003,1.5708]);
    trainRoute.push([372,336.2000000000003,1.5708]);
    trainRoute.push([374,336.2000000000003,1.5708]);
    trainRoute.push([376,336.2000000000003,1.5708]);
    trainRoute.push([378,336.2000000000003,1.5708]);
    trainRoute.push([380,336.2000000000003,1.5708]);
    trainRoute.push([382,336.2000000000003,1.5708]);
    trainRoute.push([384,336.2000000000003,1.5708]);
    trainRoute.push([386,336.2000000000003,1.5708]);
    trainRoute.push([388,336.2000000000003,1.5708]);
    trainRoute.push([390,336.2000000000003,1.5708]);
    trainRoute.push([392,336.2000000000003,1.5708]);
    trainRoute.push([394,336.2000000000003,1.5708]);
    trainRoute.push([395,337.2000000000003,1.5500000000000007]);
    trainRoute.push([396,338.2000000000003,1.5500000000000007]);
    trainRoute.push([397,339.2000000000003,1.5500000000000007]);
    trainRoute.push([398,340.2000000000003,1.7000000000000006]);
    trainRoute.push([399,341.2000000000003,1.7000000000000006]);
    trainRoute.push([400,342.2000000000003,1.7000000000000006]);
    trainRoute.push([401,343.2000000000003,1.8500000000000005]);
    trainRoute.push([402,344.2000000000003,1.8500000000000005]);
    trainRoute.push([403,345.2000000000003,1.8500000000000005]);
    trainRoute.push([404,346.2000000000003,2.0000000000000004]);
    trainRoute.push([405,347.2000000000003,2.0000000000000004]);
    trainRoute.push([406,348.2000000000003,2.0000000000000004]);
    trainRoute.push([407,349.2000000000003,2.1500000000000004]);
    trainRoute.push([408,350.2000000000003,2.1500000000000004]);
    trainRoute.push([409,351.2000000000003,2.1500000000000004]);
    trainRoute.push([410,352.2000000000003,2.3000000000000003]);
    trainRoute.push([411,353.2000000000003,2.3000000000000003]);
    trainRoute.push([412,354.2000000000003,2.3000000000000003]);
    trainRoute.push([413,355.2000000000003,2.45]);
    trainRoute.push([414,356.2000000000003,2.45]);
    trainRoute.push([415,357.2000000000003,2.45]);
    trainRoute.push([416,358.2000000000003,2.6]);
    trainRoute.push([417,359.2000000000003,2.6]);
    trainRoute.push([418,360.2000000000003,2.6]);
    trainRoute.push([419,361.2000000000003,2.75]);
    trainRoute.push([420,362.2000000000003,2.75]);
    trainRoute.push([421,363.2000000000003,2.75]);
    trainRoute.push([422,364.2000000000003,2.9]);
    trainRoute.push([423,365.2000000000003,2.9]);
    trainRoute.push([424,366.2000000000003,2.9]);
    trainRoute.push([425,367.2000000000003,3.05]);
    trainRoute.push([426,368.2000000000003,3.05]);
    trainRoute.push([427,369.2000000000003,3.05]);
    trainRoute.push([427,369,3.14]);
    trainRoute.push([427,371,3.14]);
    trainRoute.push([427,373,3.14]);
    trainRoute.push([427,375,3.14]);
    trainRoute.push([427,377,3.14]);
    trainRoute.push([427,379,3.14]);
    trainRoute.push([427,381,3.14]);
    trainRoute.push([427,383,3.14]);
    trainRoute.push([427,385,3.14]);
    trainRoute.push([427,387,3.14]);
    trainRoute.push([427,389,3.14]);
    trainRoute.push([427,391,3.14]);
    trainRoute.push([427,393,3.14]);
    trainRoute.push([427,395,3.14]);
    trainRoute.push([427,397,3.14]);
    trainRoute.push([427,399,3.14]);
    
    trainRouteSize = trainRoute.length;
}

async function setupComponents()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    ctx=canvas.getContext("2d");
    ctx.canvas.height = windowHeight * canvasScreenRatio;
    ctx.canvas.width = windowWidth * canvasScreenRatio;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    await loadAllImages();
    await loadTrainRoute();
}

function drawBorder()
{
    ctx.strokeStyle = "#4951F5";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(2, 2, ctx.canvas.width-20, ctx.canvas.height-24);
    ctx.stroke();
}

async function drawGrass( gridSize: number)
{
    //Top Left Grass
    for (let y = 4; y < 254; y=y+gridSize) 
    {
        for (let x = 4; x < 254; x=x+gridSize) 
        {
            ctx.drawImage(grass, y, x,gridSize,gridSize);
        }
    }

    //Right Grass
    for (let y = 104; y < 404; y=y+gridSize) 
    {
        for (let x = 604; x < 854; x=x+gridSize) 
        {
            ctx.drawImage(grass, x, y,53,gridSize);
        }
    }
}

async function drawSand( gridSize: number)
{
 //middle sand
    for (let x = 304; x < 554; x=x+gridSize) 
    {
        for (let y = 4; y < 400; y=y+gridSize) 
        {
            ctx.drawImage(sand, x, y,gridSize,gridSize);
        }
    }

    //top right sand
    for (let x = 554; x < 854; x=x+gridSize) 
    {
        ctx.drawImage(sand, x, 4,53,gridSize);
    }
    ctx.drawImage(sand, 554, 54,gridSize,gridSize);

    //Left Bottom Sand
    for (let y = 254; y < 400; y=y+gridSize) 
    {
        for (let x = 4; x < 304; x=x+gridSize) 
        {
            ctx.drawImage(sand, x, y,gridSize,gridSize);
        }
    }
}

async function drawTransitions( gridSize: number)
{
    //First Vertical Transition
    for (let y = 4; y < 254; y=y+gridSize) 
    {
        ctx.drawImage(vertTrans, 254, y,gridSize,gridSize);
    }
    // Top right Vertical Transition
    for (let y = 104; y < 404; y=y+gridSize) 
    {
        ctx.drawImage(vertTrans2, 554, y,gridSize,gridSize);
    }

    //First Horizontal Transition
    for (let y = 4; y < 254; y=y+gridSize) 
    {
        ctx.drawImage(horzTrans, y, 254,gridSize,gridSize);
    }

    //Top right Horizontal Transition
    for (let x = 604; x < 854; x=x+gridSize) 
    {
        ctx.drawImage(horzTrans2, x, 54,53,gridSize);
    }

    //Twigs or trees
    ctx.drawImage(treesB, 254, 254,gridSize,gridSize);
    ctx.drawImage(treesB, 554, 54,gridSize,gridSize);
}

async function drawTracks()
{
    let trackSize: number = 30;
     //All Horizontal Tracks
        for (let x = 4; x < 244; x=x+trackSize) 
        {
            ctx.drawImage(horzTrack, x, 65,trackSize,trackSize);
        }

        for (let x = 214; x > 34; x=x-trackSize) 
        {
            ctx.drawImage(horzTrack, x, 214,trackSize,trackSize);
        }

        for (let x = 64; x < 394; x=x+trackSize) 
        {
            ctx.drawImage(horzTrack, x, 334,trackSize,trackSize);
        }

        for (let x = 454; x < 544; x=x+trackSize) 
        {
            ctx.drawImage(horzTrack, x, 214,trackSize,trackSize);
        }

        for (let x = 574; x < 664; x=x+trackSize) 
        {
            ctx.drawImage(horzTrack, x, 364,trackSize,trackSize);
        }

        for (let x = 694; x < 844; x=x+trackSize) 
        {
            ctx.drawImage(horzTrack, x, 94,trackSize,trackSize);
        }
        ctx.drawImage(horzTrack, 826, 94,trackSize,trackSize);

     //Vertical Tracks
        for (let y = 95; y < 214; y=y+trackSize) 
        {
            ctx.drawImage(vertTrack, 244, y,trackSize,trackSize);
        }

        for (let y = 244; y < 334; y=y+trackSize) 
        {
            ctx.drawImage(vertTrack, 34, y,trackSize,trackSize);
        }
        ctx.drawImage(vertTrack, 394, 364,trackSize,trackSize);
        ctx.drawImage(vertTrack, 394, 374,trackSize,trackSize);

        for (let y = 4; y < 214; y=y+trackSize) 
        {
            ctx.drawImage(vertTrack, 424, y,trackSize,trackSize);
        }

        for (let y = 244; y < 364; y=y+trackSize) 
        {
            ctx.drawImage(vertTrack, 544, y,trackSize,trackSize);
        }

        for (let y = 334; y > 94; y=y-trackSize) 
        {
            ctx.drawImage(vertTrack, 664, y,trackSize,trackSize);
        }

     //Top Left Turn
        ctx.drawImage(tlTurn, 244, 65,trackSize,trackSize);
        ctx.drawImage(tlTurn, 394, 334,trackSize,trackSize);
        ctx.drawImage(tlTurn, 544, 214,trackSize,trackSize);

     //Bottom Left Turn
        ctx.drawImage(blTurn, 244, 214,trackSize,trackSize);
        ctx.drawImage(blTurn, 664, 364,trackSize,trackSize);
 
     //Top Right Turn
        ctx.drawImage(trTurn, 34, 214,trackSize,trackSize);
        ctx.drawImage(trTurn, 664, 94,trackSize,trackSize);
 
     //Bottom Right Turn
        ctx.drawImage(brTurn, 34, 334,trackSize,trackSize);
        ctx.drawImage(brTurn, 424, 214,trackSize,trackSize);
        ctx.drawImage(brTurn, 544, 364,trackSize,trackSize);
}

async function drawImageRotated(    
    image:CanvasImageSource,
    x:number,
    y:number,
    scale:number,
    rotation:number)
{
    // ctx.setTransform(scale, 0, 0, scale, 0, 0); // sets scale and origin
    ctx.translate(x ,y);
    ctx.rotate(rotation);
    ctx.scale(scale,scale);
    ctx.drawImage(image, -15, -15);
    ctx.setTransform(1,0,0,1,0,0);//resets transform
}

async function drawTrain() {

    if(trainCurrPos >= trainRouteSize-1)
    {
        trainCurrPos = 0;
        trainTimer = 0;
    }
    console.log("TCP"+trainCurrPos);
    if(trainTimer % trainSpeed == 0)
    {
        trainCurrPos += 1; 
    }
    await drawImageRotated(trainHead,trainRoute[trainCurrPos][0],trainRoute[trainCurrPos][1],trainScale,trainRoute[trainCurrPos][2]);
    trainTimer += 1;

}

async function drawGame()
{
    drawBorder();
    let gridSize: number = 50;
    await drawGrass(gridSize);
    await drawSand(gridSize);
    await drawTransitions(gridSize);

    await drawTracks();
    await drawTrain();

}

document.addEventListener("DOMContentLoaded", async () => {
    await setupComponents();
    window.requestAnimationFrame(eventLoop);
});


function eventLoop(timeStamp:number)
{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    // console.log(timeStamp);
    if(!gameDone)
    {
        // window.setTimeout(eventLoop, intervalTime); 
        window.requestAnimationFrame(eventLoop);

    }
 
}

// setInterval(eventLoop, 1000);
