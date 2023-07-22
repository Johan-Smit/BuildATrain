var canvas;
var ctx;
var windowWidth;
var windowHeight;
var canvasScreenRatio = 0.80;
function rendercanvas() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, windowWidth, windowHeight);
}
function setupComponents() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.canvas.height = windowHeight * canvasScreenRatio;
    ctx.canvas.width = windowWidth * canvasScreenRatio;
}
setupComponents();
rendercanvas();
alert(windowHeight);
