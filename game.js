const game = document.querySelector("#game");
const sprite = document.querySelector("#dragSprite");

const startPosition = {
  x: 850,
  y: 430,
};

let position = { ...startPosition };
let dragState = null;

function fitGameToWindow() {
  const scale = Math.min(window.innerWidth / game.offsetWidth, window.innerHeight / game.offsetHeight, 1);
  game.style.transform = `scale(${scale})`;
}

function getStageScale() {
  return game.getBoundingClientRect().width / game.offsetWidth;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setSpritePosition(x, y) {
  position = {
    x: clamp(x, 0, game.offsetWidth - sprite.offsetWidth),
    y: clamp(y, 0, game.offsetHeight - sprite.offsetHeight),
  };

  sprite.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
}

function getPointerStagePosition(event) {
  const rect = game.getBoundingClientRect();
  const scale = getStageScale();

  return {
    x: (event.clientX - rect.left) / scale,
    y: (event.clientY - rect.top) / scale,
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

window.addEventListener("resize", fitGameToWindow);

fitGameToWindow();
setSpritePosition(startPosition.x, startPosition.y);
