let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let windowWidth: number;
let windowHeight: number;
let canvasScreenRatio: number = 0.80;

function rendercanvas(){
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, windowWidth, windowHeight);
}

function setupComponents()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    ctx=canvas.getContext("2d");
    ctx.canvas.height = windowHeight * canvasScreenRatio;
    ctx.canvas.width = windowWidth * canvasScreenRatio;
}
setupComponents();
rendercanvas();

alert(windowHeight)
