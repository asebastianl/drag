const game = document.querySelector("#game");
const sprite = document.querySelector("#dragSprite");

const stageWidth = 1920;
const stageHeight = 1440;
const spriteWidth = 220;
const spriteHeight = 220;

const startPosition = {
  x: 850,
  y: 610,
};

let position = { ...startPosition };
let dragState = null;

function getScale() {
  return {
    x: game.clientWidth / stageWidth,
    y: game.clientHeight / stageHeight,
  };
}

function renderSprite() {
  const scale = getScale();

  sprite.style.width = `${spriteWidth * scale.x}px`;
  sprite.style.height = `${spriteHeight * scale.y}px`;
  sprite.style.transform = `translate3d(${position.x * scale.x}px, ${position.y * scale.y}px, 0)`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setSpritePosition(x, y) {
  position = {
    x: clamp(x, 0, stageWidth - spriteWidth),
    y: clamp(y, 0, stageHeight - spriteHeight),
  };

  renderSprite();
}

function getPointerStagePosition(event) {
  const rect = game.getBoundingClientRect();
  const scale = getScale();

  return {
    x: (event.clientX - rect.left) / scale.x,
    y: (event.clientY - rect.top) / scale.y,
  };
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

window.addEventListener("resize", renderSprite);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", renderSprite);
}

setSpritePosition(startPosition.x, startPosition.y);
