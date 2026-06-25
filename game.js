const game = document.querySelector("#game");
const sprite = document.querySelector("#dragSprite");
const grid = document.querySelector("#grid");

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

function renderSprite() {
  sprite.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setSpritePosition(x, y) {
  const spriteRect = sprite.getBoundingClientRect();

  position = {
    x: clamp(x, 0, game.clientWidth - spriteRect.width),
    y: clamp(y, 0, game.clientHeight - spriteRect.height),
  };

  renderSprite();
}

function getPointerStagePosition(event) {
  const rect = game.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
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

createGrid();
setStartPosition();
