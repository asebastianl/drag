const game = document.querySelector("#game");
const sprite = document.querySelector("#dragSprite");
const grid = document.querySelector("#grid");

const stageWidth = 1920;
const stageHeight = 1440;

const startPosition = {
  x: 850,
  y: 610,
};

let position = {
  x: 0,
  y: 0,
};
let dragState = null;

function createGrid() {
  for (let row = 0; row < 12; row += 1) {
    for (let column = 0; column < 16; column += 1) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.textContent = `${column + 1},${row + 1}`;
      grid.append(cell);
    }
  }
}

function fitGameToIframe() {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const scale = Math.min(viewportWidth / stageWidth, viewportHeight / stageHeight);
  const left = (viewportWidth - stageWidth * scale) / 2;
  const top = (viewportHeight - stageHeight * scale) / 2;

  game.style.left = `${left}px`;
  game.style.top = `${top}px`;
  game.style.transform = `scale(${scale})`;
}

function getGameScale() {
  return game.getBoundingClientRect().width / stageWidth;
}

function renderSprite() {
  sprite.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setSpritePosition(x, y) {
  position = {
    x: clamp(x, 0, game.offsetWidth - sprite.offsetWidth),
    y: clamp(y, 0, game.offsetHeight - sprite.offsetHeight),
  };

  renderSprite();
}

function getPointerStagePosition(event) {
  const rect = game.getBoundingClientRect();
  const scale = getGameScale();

  return {
    x: (event.clientX - rect.left) / scale,
    y: (event.clientY - rect.top) / scale,
  };
}

function setStartPosition() {
  setSpritePosition(startPosition.x, startPosition.y);
}

function startDrag(event) {
  const pointer = getPointerStagePosition(event);

  dragState = {
    pointerId: event.pointerId,
    offsetX: pointer.x - position.x,
    offsetY: pointer.y - position.y,
  };

  sprite.classList.add("is-dragging");
  sprite.setPointerCapture(event.pointerId);
}

function moveDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return;
  }

  const pointer = getPointerStagePosition(event);
  setSpritePosition(pointer.x - dragState.offsetX, pointer.y - dragState.offsetY);
}

function endDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return;
  }

  dragState = null;
  sprite.classList.remove("is-dragging");
}

sprite.addEventListener("pointerdown", startDrag);
sprite.addEventListener("pointermove", moveDrag);
sprite.addEventListener("pointerup", endDrag);
sprite.addEventListener("pointercancel", endDrag);

window.addEventListener("resize", fitGameToIframe);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", fitGameToIframe);
}

createGrid();
fitGameToIframe();
setStartPosition();
