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

async function drawGame()
{

    let gridSize: number = 50;
    let grass1:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass1.png');
        //Top Left Grass
        for (let y = 4; y < 254; y=y+gridSize) 
        {
            for (let x = 4; x < 254; x=x+gridSize) 
            {
                ctx.drawImage(grass1, y, x,gridSize,gridSize);
            }
        }

        //Right Grass
        for (let y = 104; y < 404; y=y+gridSize) 
        {
            for (let x = 604; x < 854; x=x+gridSize) 
            {
                ctx.drawImage(grass1, x, y,53,gridSize);
            }
        }

    //First Vertical Transition
    let vertTrans:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass_transitionE.png');
        for (let y = 4; y < 254; y=y+gridSize) 
        {
            ctx.drawImage(vertTrans, 254, y,gridSize,gridSize);
        }


    let vertTrans2:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass_transitionW.png');
        // Top right Vertical Transition
        for (let y = 104; y < 404; y=y+gridSize) 
        {
            ctx.drawImage(vertTrans2, 554, y,gridSize,gridSize);
        }


    //middle sand
    let sand1:CanvasImageSource = await loadImage('./images/gameGrid/tileSand1.png');

        for (let x = 304; x < 554; x=x+gridSize) 
        {
            for (let y = 4; y < 400; y=y+gridSize) 
            {
                ctx.drawImage(sand1, x, y,gridSize,gridSize);
            }
        }

        //top right sand
        for (let x = 554; x < 854; x=x+gridSize) 
        {
            ctx.drawImage(sand1, x, 4,53,gridSize);
        }
        ctx.drawImage(sand1, 554, 54,gridSize,gridSize);

        //Left Bottom Sand
        for (let y = 254; y < 400; y=y+gridSize) 
        {
            for (let x = 4; x < 304; x=x+gridSize) 
            {
                ctx.drawImage(sand1, x, y,gridSize,gridSize);
            }
        }


    //First Horizontal Transition
    let horzTrans:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass_transitionS.png');
        for (let y = 4; y < 254; y=y+gridSize) 
        {
            ctx.drawImage(horzTrans, y, 254,gridSize,gridSize);
        }

        //Top right Horizontal Transition
        let horzTrans2:CanvasImageSource = await loadImage('./images/gameGrid/tileGrass_transitionN.png');

        for (let x = 604; x < 854; x=x+gridSize) 
        {
            ctx.drawImage(horzTrans2, x, 54,53,gridSize);
        }



    //Twigs or trees
    let treesB:CanvasImageSource = await loadImage('./images/gameGrid/treeBrown_large.png');
    ctx.drawImage(treesB, 254, 254,gridSize,gridSize);
    ctx.drawImage(treesB, 554, 54,gridSize,gridSize);

    drawTracks();

}

async function drawTracks()
{
    let trackSize: number = 30;
     //All Horizontal Tracks
    let horzTrack:CanvasImageSource = await loadImage('./images/trainTracks/horzTrack.png');
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
    let vertTrack:CanvasImageSource = await loadImage('./images/trainTracks/vertTrack2.png');
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
    let tlTurn:CanvasImageSource = await loadImage('./images/trainTracks/topLeftTurn.png');
        ctx.drawImage(tlTurn, 244, 65,trackSize,trackSize);
        ctx.drawImage(tlTurn, 394, 334,trackSize,trackSize);
        ctx.drawImage(tlTurn, 544, 214,trackSize,trackSize);

     //Bottom Left Turn
    let blTurn:CanvasImageSource = await loadImage('./images/trainTracks/bottomLeftTurn.png');
        ctx.drawImage(blTurn, 244, 214,trackSize,trackSize);
        ctx.drawImage(blTurn, 664, 364,trackSize,trackSize);
 
     //Top Right Turn
    let trTurn:CanvasImageSource = await loadImage('./images/trainTracks/topRightTurn.png');
        ctx.drawImage(trTurn, 34, 214,trackSize,trackSize);
        ctx.drawImage(trTurn, 664, 94,trackSize,trackSize);
 
     //Bottom Right Turn
    let brTurn:CanvasImageSource = await loadImage('./images/trainTracks/bottomRightTurn.png');
        ctx.drawImage(brTurn, 34, 334,trackSize,trackSize);
        ctx.drawImage(brTurn, 424, 214,trackSize,trackSize);
        ctx.drawImage(brTurn, 544, 364,trackSize,trackSize);

}
setupComponents();
drawGame();

