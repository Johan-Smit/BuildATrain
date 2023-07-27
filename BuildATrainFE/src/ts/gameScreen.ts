let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let windowWidth: number;
let windowHeight: number;
let pixelSizeX:number;
let pixelSizeY:number;
let defaultWidth:number = 1097;
let defaultHeight:number = 535;

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
let smoke:CanvasImageSource;

let smallTrain:CanvasImageSource;
let medTrain:CanvasImageSource;
let largeTrain:CanvasImageSource;
let fuelCart:CanvasImageSource;
let cargoCart:CanvasImageSource;
let passangerCart:CanvasImageSource;

let trainScale: number;
let trainCurrPos:number = 0;
let trainRoute: number[][] = [];
let trainRouteSize:number;
let trainSpeed:number = 1;
let gridSize: number = 15;
let trackSize: number = 10;

let cartScale:number = 0.20;
let cartFollowingDistance:number;
let locomotiveChoice: string;
let cartsBought: CanvasImageSource[] = [];//Everytime a user buys a cart it must be added to this array

interface Train
{
    trainId:number,
    locomotiveTypeId: number,
    locomotiveName: string,
    numPassengerCars: number,
    numCargoCars: number,
    numFuelCars: number
}



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

    smallTrain = await loadImage('./images/trainParts/locomotiveSmall.png');
    medTrain = await loadImage('./images/trainParts/locomotiveMedium.png');
    largeTrain = await loadImage('./images/trainParts/locomotiveLarge.png');

    fuelCart = await loadImage('./images/trainParts/fuelCart.png');
    cargoCart = await loadImage('./images/trainParts/cargoCart.png');
    passangerCart = await loadImage('./images/trainParts/passangerCart.png');

    smoke = await loadImage('./images/trainParts/smoke.png');


    //TODO: User chooses the small/med/large locomotive option here
    // switch (locomotiveChoice) {
    //     case "small":
    //         trainScale = 0.18;
    //         cartFollowingDistance = 25;
    //         break;
    
    //     case "medium":
    //         trainHead = await loadImage('./images/trainParts/locomotiveMedium.png');
    //         trainScale = 0.2;
    //         cartFollowingDistance = 30;
            
    //         break;
        
    //     case "large":
    //         trainHead = await loadImage('./images/trainParts/locomotiveLarge.png');
    //         trainScale = 0.22;
    //         cartFollowingDistance = 43;
            
    //         break;
    // }



    // cartsBought.push(fuelCart);
    // cartsBought.push(passangerCart);
    // cartsBought.push(cargoCart);

    // cartsBought.push(fuelCart);
    // cartsBought.push(passangerCart);
    // cartsBought.push(cargoCart);

}

async function loadTrainRoute()
{
    let trainIncrements:number = 0.5;
    for (let x = 0; x < 0.25*canvas.width; x=x+trainIncrements) 
    {
        trainRoute.push([x,0.1*canvas.height,1.5708]);
    }

    for (let y = 0.1*canvas.height+2*trackSize; y < 0.5*canvas.height; y=y+trainIncrements) 
    {
        trainRoute.push([0.25*canvas.width+trackSize,y,3.14]);
    }

    for (let x = 0.25*canvas.width; x > 0.05*canvas.width; x=x-trainIncrements) 
    {
        trainRoute.push([x,0.5*canvas.height+trackSize,4.71]);
    }

    for (let y = 0.5*canvas.height+trackSize; y < 0.85*canvas.height; y=y+trainIncrements) 
    {
        trainRoute.push([0.05*canvas.width+trackSize,y,3.14]);
    }

    for (let x = 0.05+2*trackSize; x < 0.45*canvas.width; x=x+trainIncrements) 
    {
        trainRoute.push([x,0.85*canvas.height,1.5708]);
    }

    for (let y = 0.85*canvas.height+trackSize; y < canvas.height; y=y+trainIncrements) 
    {
        trainRoute.push([0.45*canvas.width+trackSize,y,3.14]);
    }

    for (let y = 1; y < 50; y=y+trainIncrements) 
    {
        trainRoute.push([0,0,-99]);
    }

    //Second half of route

    for (let y = 0; y < 0.4*canvas.height; y=y+trainIncrements) 
    {
        trainRoute.push([0.5*canvas.width+trackSize,y,3.14]);
    }

    for (let x = 0.5*canvas.width+trackSize; x < 0.65*canvas.width; x=x+trainIncrements) 
    {
        trainRoute.push([x,0.4*canvas.height,1.57]);
    }

    for (let y = 0.4*canvas.height+trackSize; y < 0.9*canvas.height; y=y+trainIncrements) 
    {
        trainRoute.push([0.65*canvas.width+trackSize,y,3.14]);
    }

    for (let x = 0.65*canvas.width+trackSize; x < 0.8*canvas.width; x=x+trainIncrements) 
    {
        trainRoute.push([x,0.9*canvas.height,1.57]);
    }

    for (let y = 0.9*canvas.height; y > 0.2*canvas.height; y=y-trainIncrements) 
    {
        trainRoute.push([ 0.8*canvas.width,y,0]);
    }
    for (let x = 0.8*canvas.width+trackSize; x < canvas.width; x=x+trainIncrements) 
    {
        trainRoute.push([ x,0.2*canvas.height,1.57]);
    }
    
    for (let y = 1; y < 50; y=y+trainIncrements) 
    {
        trainRoute.push([0,0,-99]);
    }
    trainRouteSize = trainRoute.length;
}

async function setupComponents()
{
    pixelSizeX = windowWidth/defaultWidth;
    pixelSizeY = windowHeight/defaultHeight;

    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    ctx=canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    await loadAllImages();
    await loadTrainRoute();
}

async function drawGrass()
{
    //Top Left Grass
    for (let y = 0; y < 0.6*canvas.height; y=y+gridSize) 
    {
        for (let x = 0; x < 0.3*canvas.width; x=x+gridSize) 
        {
            ctx.drawImage(grass, x, y,gridSize,gridSize);
        }
    }

    //Right Grass
    for (let y = 0.2*canvas.height; y < canvas.height; y=y+gridSize) 
    {
        for (let x = 0.7*canvas.width; x < canvas.width; x=x+gridSize) 
        {
            ctx.drawImage(grass, x, y,gridSize,gridSize);
        }
    }

}

async function drawSand()
{

    //Left Bottom Sand
    for (let y = 0.7*canvas.height; y < canvas.height; y=y+gridSize) 
    {
        for (let x = 0; x < 0.3*canvas.width+gridSize; x=x+gridSize) 
        {
            ctx.drawImage(sand, x, y,gridSize,gridSize);
        }
    }

 //middle sand
    for (let x = 0.3*canvas.width+gridSize; x <  0.7*canvas.width; x=x+gridSize) 
    {
        for (let y = 0; y < canvas.height; y=y+gridSize) 
        {
            ctx.drawImage(sand, x, y,gridSize,gridSize);
        }
    }

    //top right sand
    for (let x = 0.7*canvas.width; x < canvas.width; x=x+gridSize) 
    {
        ctx.drawImage(sand, x,0,gridSize,gridSize);
    }

    
}

async function drawTransitions()
{
    //First Vertical Transition
    for (let y = 0; y < 0.6*canvas.height; y=y+gridSize) 
    {
        ctx.drawImage(vertTrans, 0.3*canvas.width, y,gridSize,gridSize);
    }

    // Top right Vertical Transition
    for (let y = 0.2*canvas.height; y < canvas.height; y=y+gridSize) 
    {
        ctx.drawImage(vertTrans2,  0.7*canvas.width, y,gridSize,gridSize);
    }

    // //First Horizontal Transition
    for (let x = 0; x <  0.3*canvas.width; x=x+gridSize) 
    {
        ctx.drawImage(horzTrans, x, 0.6*canvas.height,gridSize,gridSize);
    }

    //Top right Horizontal Transition
    for (let x = 0.7*canvas.width+gridSize; x < canvas.width; x=x+gridSize) 
    {
        ctx.drawImage(horzTrans2, x, (0.2*canvas.height-gridSize),gridSize,gridSize);
    }

    // //Twigs or trees
    ctx.drawImage(treesB, 0.3*canvas.width, 0.6*canvas.height,gridSize,gridSize);
    ctx.drawImage(treesB, 0.7*canvas.width, 0.2*canvas.height-gridSize,gridSize,gridSize);
}

async function drawTracks()
{

    for (let x = 0; x < 0.25*canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.1*canvas.height,trackSize,trackSize);
    }
    ctx.drawImage(tlTurn, 0.25*canvas.width, 0.1*canvas.height,trackSize,trackSize);

    for (let y = 0.1*canvas.height+trackSize; y < 0.5*canvas.height; y=y+trackSize) 
    {
        ctx.drawImage(vertTrack, 0.25*canvas.width,y,trackSize,trackSize);
    }
    ctx.drawImage(blTurn, 0.25*canvas.width, 0.5*canvas.height,trackSize,trackSize);

    for (let x = 0.25*canvas.width-trackSize; x > 0.05*canvas.width; x=x-trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.5*canvas.height,trackSize,trackSize);
    }
    ctx.drawImage(trTurn, 0.05*canvas.width, 0.5*canvas.height,trackSize,trackSize);

    for (let y = 0.5*canvas.height+trackSize; y < 0.85*canvas.height; y=y+trackSize) 
    {
        ctx.drawImage(vertTrack, 0.05*canvas.width,y,trackSize,trackSize);
    }
    ctx.drawImage(brTurn, 0.05*canvas.width, 0.85*canvas.height,trackSize,trackSize);

    for (let x = 0.05*canvas.width+trackSize; x < 0.45*canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.85*canvas.height,trackSize,trackSize);
    }
    ctx.drawImage(tlTurn, 0.45*canvas.width, 0.85*canvas.height,trackSize,trackSize);
    ctx.drawImage(vertTrack, 0.45*canvas.width,0.85*canvas.height+trackSize,trackSize,trackSize);
    ctx.drawImage(vertTrack, 0.45*canvas.width,0.85*canvas.height+2*trackSize,trackSize,trackSize);

    //Second half of track

    for (let y = 0; y < 0.4*canvas.height; y=y+trackSize) 
    {
        ctx.drawImage(vertTrack, 0.5*canvas.width,y,trackSize,trackSize);
    }
    ctx.drawImage(brTurn, 0.5*canvas.width, 0.4*canvas.height,trackSize,trackSize);

    for (let x = 0.5*canvas.width+trackSize; x < 0.65*canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.4*canvas.height,trackSize,trackSize);
    }
    ctx.drawImage(tlTurn, 0.65*canvas.width, 0.4*canvas.height,trackSize,trackSize);

    for (let y = 0.4*canvas.height+trackSize; y < 0.9*canvas.height; y=y+trackSize) 
    {
        ctx.drawImage(vertTrack, 0.65*canvas.width,y,trackSize,trackSize);
    }
    ctx.drawImage(brTurn, 0.65*canvas.width, 0.9*canvas.height,trackSize,trackSize);

    for (let x = 0.65*canvas.width+trackSize; x < 0.8*canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.9*canvas.height,trackSize,trackSize);
    }
    ctx.drawImage(blTurn, 0.8*canvas.width, 0.9*canvas.height,trackSize,trackSize);

    for (let y = 0.9*canvas.height-trackSize; y > 0.2*canvas.height; y=y-trackSize) 
    {
        ctx.drawImage(vertTrack, 0.8*canvas.width,y,trackSize,trackSize);
    }
    ctx.drawImage(trTurn, 0.8*canvas.width, 0.2*canvas.height,trackSize,trackSize);

    for (let x = 0.8*canvas.width+trackSize; x < canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.2*canvas.height,trackSize,trackSize);
    }
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
    if(trainHead == undefined)
    {
        return;
    }

    if(trainCurrPos >= trainRouteSize-1)
    {
        trainCurrPos = 0;
        trainTimer = 0;
    }
    if(trainTimer % trainSpeed == 0)
    {
        trainCurrPos += 1; 
    }
    if(trainRoute[trainCurrPos][2] == -99)
    {
        return;
    }

    await drawImageRotated(trainHead,trainRoute[trainCurrPos][0],trainRoute[trainCurrPos][1],trainScale,trainRoute[trainCurrPos][2]);
    await drawImageRotated(smoke,trainRoute[trainCurrPos][0],trainRoute[trainCurrPos][1],0.1,trainRoute[trainCurrPos][2]);

    let cart:CanvasImageSource;
    let cartPosition:number;
    let firstCartPos:number = 0;
    for (let index = 0; index < cartsBought.length; index++) {
        cart = cartsBought[index];
        if(index == 0)
        {
            cartPosition = trainCurrPos - ((index+1)*cartFollowingDistance);
            firstCartPos = trainCurrPos - ((index+1)*cartFollowingDistance);
        }
        else
        {
            cartPosition = firstCartPos - ((index)*30);

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
    await drawGrass();
    await drawSand();
    await drawTransitions();

    await drawTracks();
    await drawTrain();

}

function updateTrain(trainsInfo:Train)
{

    console.log(trainsInfo);


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

