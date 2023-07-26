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
let fuelCart:CanvasImageSource;
let cargoCart:CanvasImageSource;
let passangerCart:CanvasImageSource;

let trainScale: number;
let trainCurrPos:number = 0;
let trainRoute: number[][] = [];
let trainRouteSize:number;
let trainSpeed:number =2;

let cartScale:number = 0.45;
let cartFollowingDistance:number;
let distanceBetweenCarts:number;
let locomotiveChoice: string = "medium";
let cartsBought: CanvasImageSource[] = [];//Everytime a user buys a cart it must be added to this array


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

    //TODO: User chooses the small/med/large locomotive option here
    switch (locomotiveChoice) {
        case "small":
            trainHead = await loadImage('./images/trainParts/locomotiveSmall.png');
            trainScale = 0.52;
            cartFollowingDistance = 17;
            distanceBetweenCarts = 16;
            break;
    
        case "medium":
            trainHead = await loadImage('./images/trainParts/locomotiveMedium.png');
            trainScale = 0.55;
            cartFollowingDistance = 20;
            distanceBetweenCarts = 18;
            
            break;
        
        case "large":
            trainHead = await loadImage('./images/trainParts/locomotiveLarge.png');
            trainScale = 0.55;
            cartFollowingDistance = 30;
            distanceBetweenCarts = 23;
            
            break;
    }

    fuelCart = await loadImage('./images/trainParts/fuelCart.png');
    cargoCart = await loadImage('./images/trainParts/cargoCart.png');
    passangerCart = await loadImage('./images/trainParts/passangerCart.png');

    cartsBought.push(fuelCart);
    cartsBought.push(passangerCart);
    cartsBought.push(cargoCart);

    cartsBought.push(fuelCart);
    cartsBought.push(passangerCart);
    cartsBought.push(cargoCart);

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
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([455,0,3.14]);
    trainRoute.push([455,2,3.14]);
    trainRoute.push([455,4,3.14]);
    trainRoute.push([455,6,3.14]);
    trainRoute.push([455,8,3.14]);
    trainRoute.push([455,10,3.14]);
    trainRoute.push([455,12,3.14]);
    trainRoute.push([455,14,3.14]);
    trainRoute.push([455,16,3.14]);
    trainRoute.push([455,18,3.14]);
    trainRoute.push([455,20,3.14]);
    trainRoute.push([455,22,3.14]);
    trainRoute.push([455,24,3.14]);
    trainRoute.push([455,26,3.14]);
    trainRoute.push([455,28,3.14]);
    trainRoute.push([455,30,3.14]);
    trainRoute.push([455,32,3.14]);
    trainRoute.push([455,34,3.14]);
    trainRoute.push([455,36,3.14]);
    trainRoute.push([455,38,3.14]);
    trainRoute.push([455,40,3.14]);
    trainRoute.push([455,42,3.14]);
    trainRoute.push([455,44,3.14]);
    trainRoute.push([455,46,3.14]);
    trainRoute.push([455,48,3.14]);
    trainRoute.push([455,50,3.14]);
    trainRoute.push([455,52,3.14]);
    trainRoute.push([455,54,3.14]);
    trainRoute.push([455,56,3.14]);
    trainRoute.push([455,58,3.14]);
    trainRoute.push([455,60,3.14]);
    trainRoute.push([455,62,3.14]);
    trainRoute.push([455,64,3.14]);
    trainRoute.push([455,66,3.14]);
    trainRoute.push([455,68,3.14]);
    trainRoute.push([455,70,3.14]);
    trainRoute.push([455,72,3.14]);
    trainRoute.push([455,74,3.14]);
    trainRoute.push([455,76,3.14]);
    trainRoute.push([455,78,3.14]);
    trainRoute.push([455,80,3.14]);
    trainRoute.push([455,82,3.14]);
    trainRoute.push([455,84,3.14]);
    trainRoute.push([455,86,3.14]);
    trainRoute.push([455,88,3.14]);
    trainRoute.push([455,90,3.14]);
    trainRoute.push([455,92,3.14]);
    trainRoute.push([455,94,3.14]);
    trainRoute.push([455,96,3.14]);
    trainRoute.push([455,98,3.14]);
    trainRoute.push([455,100,3.14]);
    trainRoute.push([455,102,3.14]);
    trainRoute.push([455,104,3.14]);
    trainRoute.push([455,106,3.14]);
    trainRoute.push([455,108,3.14]);
    trainRoute.push([455,110,3.14]);
    trainRoute.push([455,112,3.14]);
    trainRoute.push([455,114,3.14]);
    trainRoute.push([455,116,3.14]);
    trainRoute.push([455,118,3.14]);
    trainRoute.push([455,120,3.14]);
    trainRoute.push([455,122,3.14]);
    trainRoute.push([455,124,3.14]);
    trainRoute.push([455,126,3.14]);
    trainRoute.push([455,128,3.14]);
    trainRoute.push([455,130,3.14]);
    trainRoute.push([455,132,3.14]);
    trainRoute.push([455,134,3.14]);
    trainRoute.push([455,136,3.14]);
    trainRoute.push([455,138,3.14]);
    trainRoute.push([455,140,3.14]);
    trainRoute.push([455,142,3.14]);
    trainRoute.push([455,144,3.14]);
    trainRoute.push([455,146,3.14]);
    trainRoute.push([455,148,3.14]);
    trainRoute.push([455,150,3.14]);
    trainRoute.push([455,152,3.14]);
    trainRoute.push([455,154,3.14]);
    trainRoute.push([455,156,3.14]);
    trainRoute.push([455,158,3.14]);
    trainRoute.push([455,160,3.14]);
    trainRoute.push([455,162,3.14]);
    trainRoute.push([455,164,3.14]);
    trainRoute.push([455,166,3.14]);
    trainRoute.push([455,168,3.14]);
    trainRoute.push([455,170,3.14]);
    trainRoute.push([455,172,3.14]);
    trainRoute.push([455,174,3.14]);
    trainRoute.push([455,176,3.14]);
    trainRoute.push([455,178,3.14]);
    trainRoute.push([455,180,3.14]);
    trainRoute.push([455,182,3.14]);
    trainRoute.push([455,184,3.14]);
    trainRoute.push([455,186,3.14]);
    trainRoute.push([455,188,3.14]);
    trainRoute.push([455,190,3.14]);
    trainRoute.push([455,192,3.14]);
    trainRoute.push([455,194,3.14]);
    trainRoute.push([455,196,3.14]);
    trainRoute.push([455,198,3.14]);
    trainRoute.push([455,200,3.14]);
    trainRoute.push([455,202,3.14]);
    trainRoute.push([455,204,3.14]);
    trainRoute.push([455.3,204.3,3.14]);
    trainRoute.push([455.6,204.60000000000002,3.14]);
    trainRoute.push([455.90000000000003,204.90000000000003,3.14]);
    trainRoute.push([456.20000000000005,205.20000000000005,3.14]);
    trainRoute.push([456.50000000000006,205.50000000000006,2.89]);
    trainRoute.push([456.80000000000007,205.80000000000007,2.89]);
    trainRoute.push([457.1000000000001,206.10000000000008,2.89]);
    trainRoute.push([457.4000000000001,206.4000000000001,2.89]);
    trainRoute.push([457.7000000000001,206.7000000000001,2.64]);
    trainRoute.push([458.0000000000001,207.0000000000001,2.64]);
    trainRoute.push([458.3000000000001,207.30000000000013,2.64]);
    trainRoute.push([458.60000000000014,207.60000000000014,2.64]);
    trainRoute.push([458.90000000000015,207.90000000000015,2.39]);
    trainRoute.push([459.20000000000016,208.20000000000016,2.39]);
    trainRoute.push([459.50000000000017,208.50000000000017,2.39]);
    trainRoute.push([459.8000000000002,208.80000000000018,2.39]);
    trainRoute.push([460.1000000000002,209.1000000000002,2.14]);
    trainRoute.push([460.4000000000002,209.4000000000002,2.14]);
    trainRoute.push([460.7000000000002,209.70000000000022,2.14]);
    trainRoute.push([461.0000000000002,210.00000000000023,2.14]);
    trainRoute.push([461.30000000000024,210.30000000000024,1.8900000000000001]);
    trainRoute.push([461.60000000000025,210.60000000000025,1.8900000000000001]);
    trainRoute.push([461.90000000000026,210.90000000000026,1.8900000000000001]);
    trainRoute.push([462.2000000000003,211.20000000000027,1.8900000000000001]);
    trainRoute.push([462.5000000000003,211.50000000000028,1.6400000000000001]);
    trainRoute.push([462.8000000000003,211.8000000000003,1.6400000000000001]);
    trainRoute.push([463.1000000000003,212.1000000000003,1.6400000000000001]);
    trainRoute.push([463.4000000000003,212.40000000000032,1.6400000000000001]);
    trainRoute.push([463,212.40000000000032,1.5708]);
    trainRoute.push([465,212.40000000000032,1.5708]);
    trainRoute.push([467,212.40000000000032,1.5708]);
    trainRoute.push([469,212.40000000000032,1.5708]);
    trainRoute.push([471,212.40000000000032,1.5708]);
    trainRoute.push([473,212.40000000000032,1.5708]);
    trainRoute.push([475,212.40000000000032,1.5708]);
    trainRoute.push([477,212.40000000000032,1.5708]);
    trainRoute.push([479,212.40000000000032,1.5708]);
    trainRoute.push([481,212.40000000000032,1.5708]);
    trainRoute.push([483,212.40000000000032,1.5708]);
    trainRoute.push([485,212.40000000000032,1.5708]);
    trainRoute.push([487,212.40000000000032,1.5708]);
    trainRoute.push([489,212.40000000000032,1.5708]);
    trainRoute.push([491,212.40000000000032,1.5708]);
    trainRoute.push([493,212.40000000000032,1.5708]);
    trainRoute.push([495,212.40000000000032,1.5708]);
    trainRoute.push([497,212.40000000000032,1.5708]);
    trainRoute.push([499,212.40000000000032,1.5708]);
    trainRoute.push([501,212.40000000000032,1.5708]);
    trainRoute.push([503,212.40000000000032,1.5708]);
    trainRoute.push([505,212.40000000000032,1.5708]);
    trainRoute.push([507,212.40000000000032,1.5708]);
    trainRoute.push([509,212.40000000000032,1.5708]);
    trainRoute.push([511,212.40000000000032,1.5708]);
    trainRoute.push([513,212.40000000000032,1.5708]);
    trainRoute.push([515,212.40000000000032,1.5708]);
    trainRoute.push([517,212.40000000000032,1.5708]);
    trainRoute.push([519,212.40000000000032,1.5708]);
    trainRoute.push([521,212.40000000000032,1.5708]);
    trainRoute.push([523,212.40000000000032,1.5708]);
    trainRoute.push([525,212.40000000000032,1.5708]);
    trainRoute.push([527,212.40000000000032,1.5708]);
    trainRoute.push([529,212.40000000000032,1.5708]);
    trainRoute.push([531,212.40000000000032,1.5708]);
    trainRoute.push([533,212.40000000000032,1.5708]);
    trainRoute.push([535,212.40000000000032,1.5708]);
    trainRoute.push([537,212.40000000000032,1.5708]);
    trainRoute.push([539,212.40000000000032,1.5708]);
    trainRoute.push([540,213.40000000000032,1.3900000000000001]);
    trainRoute.push([541,214.40000000000032,1.3900000000000001]);
    trainRoute.push([542,215.40000000000032,1.3900000000000001]);
    trainRoute.push([543,216.40000000000032,1.54]);
    trainRoute.push([544,217.40000000000032,1.54]);
    trainRoute.push([545,218.40000000000032,1.54]);
    trainRoute.push([546,219.40000000000032,1.69]);
    trainRoute.push([547,220.40000000000032,1.69]);
    trainRoute.push([548,221.40000000000032,1.69]);
    trainRoute.push([549,222.40000000000032,1.8399999999999999]);
    trainRoute.push([550,223.40000000000032,1.8399999999999999]);
    trainRoute.push([551,224.40000000000032,1.8399999999999999]);
    trainRoute.push([552,225.40000000000032,1.9899999999999998]);
    trainRoute.push([553,226.40000000000032,1.9899999999999998]);
    trainRoute.push([554,227.40000000000032,1.9899999999999998]);
    trainRoute.push([555,228.40000000000032,2.1399999999999997]);
    trainRoute.push([556,229.40000000000032,2.1399999999999997]);
    trainRoute.push([557,230.40000000000032,2.1399999999999997]);
    trainRoute.push([558,231.40000000000032,2.2899999999999996]);
    trainRoute.push([559,232.40000000000032,2.2899999999999996]);
    trainRoute.push([560,233.40000000000032,2.2899999999999996]);
    trainRoute.push([561,234.40000000000032,2.4399999999999995]);
    trainRoute.push([562,235.40000000000032,2.4399999999999995]);
    trainRoute.push([563,236.40000000000032,2.4399999999999995]);
    trainRoute.push([564,237.40000000000032,2.5899999999999994]);
    trainRoute.push([565,238.40000000000032,2.5899999999999994]);
    trainRoute.push([566,239.40000000000032,2.5899999999999994]);
    trainRoute.push([567,240.40000000000032,2.7399999999999993]);
    trainRoute.push([568,241.40000000000032,2.7399999999999993]);
    trainRoute.push([569,242.40000000000032,2.7399999999999993]);
    trainRoute.push([570,243.40000000000032,2.8899999999999992]);
    trainRoute.push([571,244.40000000000032,2.8899999999999992]);
    trainRoute.push([572,245.40000000000032,2.8899999999999992]);
    trainRoute.push([573,246.40000000000032,3.039999999999999]);
    trainRoute.push([574,247.40000000000032,3.039999999999999]);
    trainRoute.push([575,248.40000000000032,3.039999999999999]);
    trainRoute.push([575,245,3.14]);
    trainRoute.push([575,247,3.14]);
    trainRoute.push([575,249,3.14]);
    trainRoute.push([575,251,3.14]);
    trainRoute.push([575,253,3.14]);
    trainRoute.push([575,255,3.14]);
    trainRoute.push([575,257,3.14]);
    trainRoute.push([575,259,3.14]);
    trainRoute.push([575,261,3.14]);
    trainRoute.push([575,263,3.14]);
    trainRoute.push([575,265,3.14]);
    trainRoute.push([575,267,3.14]);
    trainRoute.push([575,269,3.14]);
    trainRoute.push([575,271,3.14]);
    trainRoute.push([575,273,3.14]);
    trainRoute.push([575,275,3.14]);
    trainRoute.push([575,277,3.14]);
    trainRoute.push([575,279,3.14]);
    trainRoute.push([575,281,3.14]);
    trainRoute.push([575,283,3.14]);
    trainRoute.push([575,285,3.14]);
    trainRoute.push([575,287,3.14]);
    trainRoute.push([575,289,3.14]);
    trainRoute.push([575,291,3.14]);
    trainRoute.push([575,293,3.14]);
    trainRoute.push([575,295,3.14]);
    trainRoute.push([575,297,3.14]);
    trainRoute.push([575,299,3.14]);
    trainRoute.push([575,301,3.14]);
    trainRoute.push([575,303,3.14]);
    trainRoute.push([575,305,3.14]);
    trainRoute.push([575,307,3.14]);
    trainRoute.push([575,309,3.14]);
    trainRoute.push([575,311,3.14]);
    trainRoute.push([575,313,3.14]);
    trainRoute.push([575,315,3.14]);
    trainRoute.push([575,317,3.14]);
    trainRoute.push([575,319,3.14]);
    trainRoute.push([575,321,3.14]);
    trainRoute.push([575,323,3.14]);
    trainRoute.push([575,325,3.14]);
    trainRoute.push([575,327,3.14]);
    trainRoute.push([575,329,3.14]);
    trainRoute.push([575,331,3.14]);
    trainRoute.push([575,333,3.14]);
    trainRoute.push([575,335,3.14]);
    trainRoute.push([575,337,3.14]);
    trainRoute.push([575,339,3.14]);
    trainRoute.push([575,341,3.14]);
    trainRoute.push([575,343,3.14]);
    trainRoute.push([575,345,3.14]);
    trainRoute.push([575,347,3.14]);
    trainRoute.push([575,349,3.14]);
    trainRoute.push([575,351,3.14]);
    trainRoute.push([575,353,3.14]);
    trainRoute.push([575.3,353.3,3.189999999999999]);
    trainRoute.push([575.5999999999999,353.6,3.189999999999999]);
    trainRoute.push([575.8999999999999,353.90000000000003,3.189999999999999]);
    trainRoute.push([576.1999999999998,354.20000000000005,3.189999999999999]);
    trainRoute.push([576.4999999999998,354.50000000000006,2.939999999999999]);
    trainRoute.push([576.7999999999997,354.80000000000007,2.939999999999999]);
    trainRoute.push([577.0999999999997,355.1000000000001,2.939999999999999]);
    trainRoute.push([577.3999999999996,355.4000000000001,2.939999999999999]);
    trainRoute.push([577.6999999999996,355.7000000000001,2.689999999999999]);
    trainRoute.push([577.9999999999995,356.0000000000001,2.689999999999999]);
    trainRoute.push([578.2999999999995,356.3000000000001,2.689999999999999]);
    trainRoute.push([578.5999999999995,356.60000000000014,2.689999999999999]);
    trainRoute.push([578.8999999999994,356.90000000000015,2.439999999999999]);
    trainRoute.push([579.1999999999994,357.20000000000016,2.439999999999999]);
    trainRoute.push([579.4999999999993,357.50000000000017,2.439999999999999]);
    trainRoute.push([579.7999999999993,357.8000000000002,2.439999999999999]);
    trainRoute.push([580.0999999999992,358.1000000000002,2.189999999999999]);
    trainRoute.push([580.3999999999992,358.4000000000002,2.189999999999999]);
    trainRoute.push([580.6999999999991,358.7000000000002,2.189999999999999]);
    trainRoute.push([580.9999999999991,359.0000000000002,2.189999999999999]);
    trainRoute.push([581.299999999999,359.30000000000024,1.939999999999999]);
    trainRoute.push([581.599999999999,359.60000000000025,1.939999999999999]);
    trainRoute.push([581.899999999999,359.90000000000026,1.939999999999999]);
    trainRoute.push([582.1999999999989,360.2000000000003,1.939999999999999]);
    trainRoute.push([582.4999999999989,360.5000000000003,1.689999999999999]);
    trainRoute.push([582.7999999999988,360.8000000000003,1.689999999999999]);
    trainRoute.push([583.0999999999988,361.1000000000003,1.689999999999999]);
    trainRoute.push([583.3999999999987,361.4000000000003,1.689999999999999]);
    trainRoute.push([582,361,1.5708]);
    trainRoute.push([584,361,1.5708]);
    trainRoute.push([586,361,1.5708]);
    trainRoute.push([588,361,1.5708]);
    trainRoute.push([590,361,1.5708]);
    trainRoute.push([592,361,1.5708]);
    trainRoute.push([594,361,1.5708]);
    trainRoute.push([596,361,1.5708]);
    trainRoute.push([598,361,1.5708]);
    trainRoute.push([600,361,1.5708]);
    trainRoute.push([602,361,1.5708]);
    trainRoute.push([604,361,1.5708]);
    trainRoute.push([606,361,1.5708]);
    trainRoute.push([608,361,1.5708]);
    trainRoute.push([610,361,1.5708]);
    trainRoute.push([612,361,1.5708]);
    trainRoute.push([614,361,1.5708]);
    trainRoute.push([616,361,1.5708]);
    trainRoute.push([618,361,1.5708]);
    trainRoute.push([620,361,1.5708]);
    trainRoute.push([622,361,1.5708]);
    trainRoute.push([624,361,1.5708]);
    trainRoute.push([626,361,1.5708]);
    trainRoute.push([628,361,1.5708]);
    trainRoute.push([630,361,1.5708]);
    trainRoute.push([632,361,1.5708]);
    trainRoute.push([634,361,1.5708]);
    trainRoute.push([636,361,1.5708]);
    trainRoute.push([638,361,1.5708]);
    trainRoute.push([640,361,1.5708]);
    trainRoute.push([642,361,1.5708]);
    trainRoute.push([644,361,1.5708]);
    trainRoute.push([646,361,1.5708]);
    trainRoute.push([648,361,1.5708]);
    trainRoute.push([648.3,361.70000000000033,1.439999999999999]);
    trainRoute.push([648.5999999999999,362.00000000000034,1.439999999999999]);
    trainRoute.push([648.8999999999999,362.30000000000035,1.439999999999999]);
    trainRoute.push([649.1999999999998,362.60000000000036,1.439999999999999]);
    trainRoute.push([649.4999999999998,362.9000000000004,1.189999999999999]);
    trainRoute.push([649.7999999999997,363.2000000000004,1.189999999999999]);
    trainRoute.push([650.0999999999997,363.5000000000004,1.189999999999999]);
    trainRoute.push([650.3999999999996,363.8000000000004,1.189999999999999]);
    trainRoute.push([650.6999999999996,364.1000000000004,0.9399999999999991]);
    trainRoute.push([650.9999999999995,364.40000000000043,0.9399999999999991]);
    trainRoute.push([651.2999999999995,364.70000000000044,0.9399999999999991]);
    trainRoute.push([651.5999999999995,365.00000000000045,0.9399999999999991]);
    trainRoute.push([651.8999999999994,365.30000000000047,0.6899999999999991]);
    trainRoute.push([652.1999999999994,365.6000000000005,0.6899999999999991]);
    trainRoute.push([652.4999999999993,365.9000000000005,0.6899999999999991]);
    trainRoute.push([652.7999999999993,366.2000000000005,0.6899999999999991]);
    trainRoute.push([653.0999999999992,366.5000000000005,0.43999999999999906]);
    trainRoute.push([653.3999999999992,366.8000000000005,0.43999999999999906]);
    trainRoute.push([653.6999999999991,367.10000000000053,0.43999999999999906]);
    trainRoute.push([653.9999999999991,367.40000000000055,0.43999999999999906]);
    trainRoute.push([654.299999999999,367.70000000000056,0.18999999999999906]);
    trainRoute.push([654.599999999999,368.00000000000057,0.18999999999999906]);
    trainRoute.push([654.899999999999,368.3000000000006,0.18999999999999906]);
    trainRoute.push([655.1999999999989,368.6000000000006,0.18999999999999906]);
    trainRoute.push([665,368,0]);
    trainRoute.push([665,366,0]);
    trainRoute.push([665,364,0]);
    trainRoute.push([665,362,0]);
    trainRoute.push([665,360,0]);
    trainRoute.push([665,358,0]);
    trainRoute.push([665,356,0]);
    trainRoute.push([665,354,0]);
    trainRoute.push([665,352,0]);
    trainRoute.push([665,350,0]);
    trainRoute.push([665,348,0]);
    trainRoute.push([665,346,0]);
    trainRoute.push([665,344,0]);
    trainRoute.push([665,342,0]);
    trainRoute.push([665,340,0]);
    trainRoute.push([665,338,0]);
    trainRoute.push([665,336,0]);
    trainRoute.push([665,334,0]);
    trainRoute.push([665,332,0]);
    trainRoute.push([665,330,0]);
    trainRoute.push([665,328,0]);
    trainRoute.push([665,326,0]);
    trainRoute.push([665,324,0]);
    trainRoute.push([665,322,0]);
    trainRoute.push([665,320,0]);
    trainRoute.push([665,318,0]);
    trainRoute.push([665,316,0]);
    trainRoute.push([665,314,0]);
    trainRoute.push([665,312,0]);
    trainRoute.push([665,310,0]);
    trainRoute.push([665,308,0]);
    trainRoute.push([665,306,0]);
    trainRoute.push([665,304,0]);
    trainRoute.push([665,302,0]);
    trainRoute.push([665,300,0]);
    trainRoute.push([665,298,0]);
    trainRoute.push([665,296,0]);
    trainRoute.push([665,294,0]);
    trainRoute.push([665,292,0]);
    trainRoute.push([665,290,0]);
    trainRoute.push([665,288,0]);
    trainRoute.push([665,286,0]);
    trainRoute.push([665,284,0]);
    trainRoute.push([665,282,0]);
    trainRoute.push([665,280,0]);
    trainRoute.push([665,278,0]);
    trainRoute.push([665,276,0]);
    trainRoute.push([665,274,0]);
    trainRoute.push([665,272,0]);
    trainRoute.push([665,270,0]);
    trainRoute.push([665,268,0]);
    trainRoute.push([665,266,0]);
    trainRoute.push([665,264,0]);
    trainRoute.push([665,262,0]);
    trainRoute.push([665,260,0]);
    trainRoute.push([665,258,0]);
    trainRoute.push([665,256,0]);
    trainRoute.push([665,254,0]);
    trainRoute.push([665,252,0]);
    trainRoute.push([665,250,0]);
    trainRoute.push([665,248,0]);
    trainRoute.push([665,246,0]);
    trainRoute.push([665,244,0]);
    trainRoute.push([665,242,0]);
    trainRoute.push([665,240,0]);
    trainRoute.push([665,238,0]);
    trainRoute.push([665,236,0]);
    trainRoute.push([665,234,0]);
    trainRoute.push([665,232,0]);
    trainRoute.push([665,230,0]);
    trainRoute.push([665,228,0]);
    trainRoute.push([665,226,0]);
    trainRoute.push([665,224,0]);
    trainRoute.push([665,222,0]);
    trainRoute.push([665,220,0]);
    trainRoute.push([665,218,0]);
    trainRoute.push([665,216,0]);
    trainRoute.push([665,214,0]);
    trainRoute.push([665,212,0]);
    trainRoute.push([665,210,0]);
    trainRoute.push([665,208,0]);
    trainRoute.push([665,206,0]);
    trainRoute.push([665,204,0]);
    trainRoute.push([665,202,0]);
    trainRoute.push([665,200,0]);
    trainRoute.push([665,198,0]);
    trainRoute.push([665,196,0]);
    trainRoute.push([665,194,0]);
    trainRoute.push([665,192,0]);
    trainRoute.push([665,190,0]);
    trainRoute.push([665,188,0]);
    trainRoute.push([665,186,0]);
    trainRoute.push([665,184,0]);
    trainRoute.push([665,182,0]);
    trainRoute.push([665,180,0]);
    trainRoute.push([665,178,0]);
    trainRoute.push([665,176,0]);
    trainRoute.push([665,174,0]);
    trainRoute.push([665,172,0]);
    trainRoute.push([665,170,0]);
    trainRoute.push([665,168,0]);
    trainRoute.push([665,166,0]);
    trainRoute.push([665,164,0]);
    trainRoute.push([665,162,0]);
    trainRoute.push([665,160,0]);
    trainRoute.push([665,158,0]);
    trainRoute.push([665,156,0]);
    trainRoute.push([665,154,0]);
    trainRoute.push([665,152,0]);
    trainRoute.push([665,150,0]);
    trainRoute.push([665,148,0]);
    trainRoute.push([665,146,0]);
    trainRoute.push([665,144,0]);
    trainRoute.push([665,142,0]);
    trainRoute.push([665,140,0]);
    trainRoute.push([665,138,0]);
    trainRoute.push([665,136,0]);
    trainRoute.push([665,134,0]);
    trainRoute.push([665,132,0]);
    trainRoute.push([665,130,0]);
    trainRoute.push([665,128,0]);
    trainRoute.push([665,126,0]);
    trainRoute.push([656.1999999999989,125,-0.06000000000000094]);
    trainRoute.push([657.1999999999989,124,-0.06000000000000094]);
    trainRoute.push([658.1999999999989,123,-0.06000000000000094]);
    trainRoute.push([659.1999999999989,122,0.08999999999999905]);
    trainRoute.push([660.1999999999989,121,0.08999999999999905]);
    trainRoute.push([661.1999999999989,120,0.08999999999999905]);
    trainRoute.push([662.1999999999989,119,0.23999999999999905]);
    trainRoute.push([663.1999999999989,118,0.23999999999999905]);
    trainRoute.push([664.1999999999989,117,0.23999999999999905]);
    trainRoute.push([665.1999999999989,116,0.389999999999999]);
    trainRoute.push([666.1999999999989,115,0.389999999999999]);
    trainRoute.push([667.1999999999989,114,0.389999999999999]);
    trainRoute.push([668.1999999999989,113,0.539999999999999]);
    trainRoute.push([669.1999999999989,112,0.539999999999999]);
    trainRoute.push([670.1999999999989,111,0.539999999999999]);
    trainRoute.push([671.1999999999989,110,0.6899999999999991]);
    trainRoute.push([672.1999999999989,109,0.6899999999999991]);
    trainRoute.push([673.1999999999989,108,0.6899999999999991]);
    trainRoute.push([674.1999999999989,107,0.8399999999999991]);
    trainRoute.push([675.1999999999989,106,0.8399999999999991]);
    trainRoute.push([676.1999999999989,105,0.8399999999999991]);
    trainRoute.push([677.1999999999989,104,0.9899999999999991]);
    trainRoute.push([678.1999999999989,103,0.9899999999999991]);
    trainRoute.push([679.1999999999989,102,0.9899999999999991]);
    trainRoute.push([680.1999999999989,101,1.139999999999999]);
    trainRoute.push([681.1999999999989,100,1.139999999999999]);
    trainRoute.push([682.1999999999989,99,1.139999999999999]);
    trainRoute.push([683.1999999999989,98,1.289999999999999]);
    trainRoute.push([684.1999999999989,97,1.289999999999999]);
    trainRoute.push([685.1999999999989,96,1.289999999999999]);
    trainRoute.push([686.1999999999989,95,1.4399999999999988]);
    trainRoute.push([687.1999999999989,94,1.4399999999999988]);
    trainRoute.push([688.1999999999989,93,1.4399999999999988]);
    trainRoute.push([688,90,1.57]);
    trainRoute.push([690,90,1.57]);
    trainRoute.push([692,90,1.57]);
    trainRoute.push([694,90,1.57]);
    trainRoute.push([696,90,1.57]);
    trainRoute.push([698,90,1.57]);
    trainRoute.push([700,90,1.57]);
    trainRoute.push([702,90,1.57]);
    trainRoute.push([704,90,1.57]);
    trainRoute.push([706,90,1.57]);
    trainRoute.push([708,90,1.57]);
    trainRoute.push([710,90,1.57]);
    trainRoute.push([712,90,1.57]);
    trainRoute.push([714,90,1.57]);
    trainRoute.push([716,90,1.57]);
    trainRoute.push([718,90,1.57]);
    trainRoute.push([720,90,1.57]);
    trainRoute.push([722,90,1.57]);
    trainRoute.push([724,90,1.57]);
    trainRoute.push([726,90,1.57]);
    trainRoute.push([728,90,1.57]);
    trainRoute.push([730,90,1.57]);
    trainRoute.push([732,90,1.57]);
    trainRoute.push([734,90,1.57]);
    trainRoute.push([736,90,1.57]);
    trainRoute.push([738,90,1.57]);
    trainRoute.push([740,90,1.57]);
    trainRoute.push([742,90,1.57]);
    trainRoute.push([744,90,1.57]);
    trainRoute.push([746,90,1.57]);
    trainRoute.push([748,90,1.57]);
    trainRoute.push([750,90,1.57]);
    trainRoute.push([752,90,1.57]);
    trainRoute.push([754,90,1.57]);
    trainRoute.push([756,90,1.57]);
    trainRoute.push([758,90,1.57]);
    trainRoute.push([760,90,1.57]);
    trainRoute.push([762,90,1.57]);
    trainRoute.push([764,90,1.57]);
    trainRoute.push([766,90,1.57]);
    trainRoute.push([768,90,1.57]);
    trainRoute.push([770,90,1.57]);
    trainRoute.push([772,90,1.57]);
    trainRoute.push([774,90,1.57]);
    trainRoute.push([776,90,1.57]);
    trainRoute.push([778,90,1.57]);
    trainRoute.push([780,90,1.57]);
    trainRoute.push([782,90,1.57]);
    trainRoute.push([784,90,1.57]);
    trainRoute.push([786,90,1.57]);
    trainRoute.push([788,90,1.57]);
    trainRoute.push([790,90,1.57]);
    trainRoute.push([792,90,1.57]);
    trainRoute.push([794,90,1.57]);
    trainRoute.push([796,90,1.57]);
    trainRoute.push([798,90,1.57]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    trainRoute.push([0,0,3.14]);
    
    
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
    if(trainTimer % trainSpeed == 0)
    {
        trainCurrPos += 1; 
    }

    await drawImageRotated(trainHead,trainRoute[trainCurrPos][0],trainRoute[trainCurrPos][1],trainScale,trainRoute[trainCurrPos][2]);

    let cart:CanvasImageSource;
    let cartPosition:number;
    for (let index = 0; index < cartsBought.length; index++) {
        cart = cartsBought[index];
        if(index == 0)
        {
            cartPosition = trainCurrPos - ((index+1)*cartFollowingDistance);

        }
        else
        {
            cartPosition = trainCurrPos - ((index+1)*distanceBetweenCarts);

        }
        if(cartPosition > 0)
        {
            drawImageRotated(cart,trainRoute[cartPosition][0],trainRoute[cartPosition][1],cartScale,trainRoute[cartPosition][2]);
        }
        
    }

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
