const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', window.innerWidth / 100 * 90);
canvas.setAttribute('height', window.innerHeight / 100 * 70);

const colorInput = document.getElementById('iColor');
const sizeInput = document.getElementById('iSize');
const sizeLabel = document.getElementById('iSizeLabel');
sizeLabel.innerHTML = `Width: ${sizeInput.value}px`;

let x = 0;
let y = 0;
let newX = 0;
let newY = 0;
let isPointerDown = false;
let strokeColor = colorInput.value;
let lineWidth = sizeInput.value;

ctx.strokeStyle = strokeColor;
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';

sizeInput.addEventListener('input', (event) => {
  sizeLabel.innerHTML = `Width: ${event.target.value}px`;
  ctx.lineWidth = event.target.value;
})

colorInput.addEventListener('change', (event) => {
  ctx.strokeStyle = event.target.value;
})

const startDrawing = (e) => {
  isPointerDown = true;
  [x, y] = [event.offsetX, event.offsetY];
};

const stopDrawing = () => isPointerDown = false;

const draw = (e) => {
  if(isPointerDown) {
    [newX, newY] = [e.offsetX, e.offsetY];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY); 
    ctx.stroke();
    [x, y] = [newX, newY];
  }
}

canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);

canvas.ontouchend = (e) => {
    e.preventDefault();
};
