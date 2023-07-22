let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let windowWidth: number;
let windowHeight: number;
let canvasScreenRatio: number = 0.80;

//TODO: see how I autoresized canvas from prev project


function setupComponents()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    ctx=canvas.getContext("2d");
    ctx.canvas.height = windowHeight * canvasScreenRatio;
    ctx.canvas.width = windowWidth * canvasScreenRatio;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.strokeStyle = "#4951F5";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(2, 2, ctx.canvas.width-20, ctx.canvas.height-24);
    ctx.stroke();
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

async function drawBackGround()
{
    //Top Left Grass
    let grass1:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass1.png');

        for (let y = 4; y < 254; y=y+50) 
        {
            for (let x = 4; x < 254; x=x+50) 
            {
                ctx.drawImage(grass1, y, x,50,50);
            }
        }

    //First Vertical Transition
    let vertTrans:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass_transitionE.png');
    for (let y = 4; y < 254; y=y+50) 
    {
        ctx.drawImage(vertTrans, 254, y,50,50);
    }

    //Middle sand
    let sand1 = new Image();
    sand1.src = './images/gameGrid/tileSand1.png';
    sand1.onload = () => {
        for (let x = 304; x < 554; x=x+50) 
        {
            for (let y = 4; y < 400; y=y+50) 
            {
                ctx.drawImage(sand1, x, y,50,50);
            }
        }

        //Left Bottom Sand
        for (let y = 254; y < 400; y=y+50) 
        {
            for (let x = 4; x < 304; x=x+50) 
            {
                ctx.drawImage(sand1, x, y,50,50);
            }
        }
    };

    //First Horizontal Transition
    let horzTrans = new Image();
    horzTrans.src = './images/gameGrid/tileGrass_transitionS.png';
    horzTrans.onload = () => {
        for (let y = 4; y < 254; y=y+50) 
        {
            ctx.drawImage(horzTrans, y, 254,50,50);
        }
    }

    //Twigs or trees
    let treesB = new Image();
    treesB.src = './images/gameGrid/treeBrown_large.png';
    treesB.onload = () => {
        ctx.drawImage(treesB, 254, 254,50,50);

    }
}

function drawTracks()
{
     //All Horizontal Tracks
     let horzTrack = new Image();
     horzTrack.src = './images/trainTracks/horzTrack.png';
     horzTrack.onload = () => {
         for (let x = 4; x < 244; x=x+30) 
         {
             ctx.drawImage(horzTrack, x, 65,30,30);
         }
 
         for (let x = 214; x > 34; x=x-30) 
         {
             ctx.drawImage(horzTrack, x, 214,30,30);
         }
 
         for (let x = 64; x < 334; x=x+30) 
         {
             ctx.drawImage(horzTrack, x, 334,30,30);
         }
     }
 
     //Vertical Tracks
     let vertTrack = new Image();
     vertTrack.src = './images/trainTracks/vertTrack2.png';
     vertTrack.onload = () => {
         for (let y = 95; y < 214; y=y+30) 
         {
             ctx.drawImage(vertTrack, 244, y,30,30);
         }
 
         for (let y = 244; y < 334; y=y+30) 
         {
             ctx.drawImage(vertTrack, 34, y,30,30);
         }
     }
 
     //Top Left Turn
     let tlTurn = new Image();
     tlTurn.src = './images/trainTracks/topLeftTurn.png';
     tlTurn.onload = () => {
         ctx.drawImage(tlTurn, 244, 65,30,30);
     }
 
     //Bottom Left Turn
     let blTurn = new Image();
     blTurn.src = './images/trainTracks/bottomLeftTurn.png';
     blTurn.onload = () => {
         ctx.drawImage(blTurn, 244, 214,30,30);
     }
 
     //Top Right Turn
     let trTurn = new Image();
     trTurn.src = './images/trainTracks/topRightTurn.png';
     trTurn.onload = () => {
         ctx.drawImage(trTurn, 34, 214,30,30);
     }
 
     //Bottom Right Turn
     let brTurn = new Image();
     brTurn.src = './images/trainTracks/bottomRightTurn.png';
     brTurn.onload = () => {
         ctx.drawImage(brTurn, 34, 334,30,30);
     }
}

function drawGame()
{
    
    drawBackGround();
    drawTracks();
   
}
setupComponents();
drawGame();

