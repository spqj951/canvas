const canvas = document.querySelector("canvas");
const file = document.getElementById("file");
const ctx = canvas.getContext("2d");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const saveBtn = document.getElementById("save-btn");
const eraseBtn = document.getElementById("erase-btn");
const resetBtn = document.getElementById("reset-btn");
const modeBtn = document.getElementById("mode-btn");
canvas.width = 800;
canvas.height = 800;
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;
const lineColor = document.getElementById("color");
ctx.strokeStyle = lineColor.value;
let isPainting = false;
let isFilling = false;
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function stopPainting() {
  isPainting = false;
}
function onChange(event) {
  ctx.lineWidth = event.target.value;
}
function changeColor(event) {
  ctx.strokeStyle = event.target.value;
}
function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillStyle = color.value;
    ctx.fillRect(0, 0, 800, 800);
  }
}
function onReset() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}
function onErase() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 100, 20);
  };
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myToken";
  a.click();
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onChange);
lineColor.addEventListener("change", changeColor);
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onReset);
eraseBtn.addEventListener("click", onErase);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
file.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
