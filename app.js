const textSnippets = {
  1: "This is the first placeholder text snippet. It is long enough to test how body copy wraps inside the assigned grid area.",
  2: "This is the second placeholder text snippet. It gives the screen a different amount of copy, which is useful when checking vertical alignment.",
  3: "This is the third placeholder text snippet. It helps verify that changing content does not move the buttons or disturb the surrounding layout."
};

const copyElement = document.querySelector("[data-copy]");
const snippetIds = Object.keys(textSnippets).map(Number);
let currentSnippetIndex = 0;

function renderSnippet() {
  const snippetId = snippetIds[currentSnippetIndex];
  copyElement.textContent = textSnippets[snippetId];
}

function showPreviousSnippet() {
  currentSnippetIndex =
    (currentSnippetIndex - 1 + snippetIds.length) % snippetIds.length;
  renderSnippet();
}

function showNextSnippet() {
  currentSnippetIndex = (currentSnippetIndex + 1) % snippetIds.length;
  renderSnippet();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !copyElement) {
    return;
  }

  if (button.dataset.action === "back") {
    showPreviousSnippet();
  }

  if (button.dataset.action === "continue") {
    showNextSnippet();
  }
});

if (copyElement) {
  renderSnippet();
}
