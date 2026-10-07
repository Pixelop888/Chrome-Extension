(() => {
  const conversationTurnSelector = '[data-testid^="conversation-turn-"]';
  const messageSelector = "[data-message-author-role]";
  const turnSelector = `${conversationTurnSelector}, ${messageSelector}`;
  const textBlockSelector =
    "main p, main pre, main blockquote, main li, main [dir='auto']";

  let bookmark = null;

  const controls = document.createElement("div");
  controls.className = "conversation-bookmark-controls";
  controls.innerHTML = `
    <button type="button" class="conversation-bookmark-save">
      Save position
    </button>
    <button type="button" class="conversation-bookmark-return" disabled>
      Go to bookmark
    </button>
    <span class="conversation-bookmark-status" role="status" aria-live="polite"></span>
  `;
  document.body.append(controls);

  const saveButton = controls.querySelector(".conversation-bookmark-save");
  const returnButton = controls.querySelector(".conversation-bookmark-return");
  const status = controls.querySelector(".conversation-bookmark-status");

  function getTurns() {
    const turns = [...document.querySelectorAll(turnSelector)];
    const conversationTurns = turns.filter((turn) =>
      turn.matches(conversationTurnSelector)
    );
    if (conversationTurns.length || turns.length) {
      return conversationTurns.length ? conversationTurns : turns;
    }

    return [...document.querySelectorAll(textBlockSelector)].filter(
      (block) => block.textContent.trim() && block.getClientRects().length
    );
  }

  function getClosestTurn() {
    const viewportCenter = window.innerHeight / 2;
    let closestTurn = null;
    let closestDistance = Infinity;

    for (const turn of getTurns()) {
      const rect = turn.getBoundingClientRect();
      const distance =
        viewportCenter < rect.top
          ? rect.top - viewportCenter
          : viewportCenter > rect.bottom
            ? viewportCenter - rect.bottom
            : 0;

      if (distance < closestDistance) {
        closestTurn = turn;
        closestDistance = distance;
      }
    }

    return closestTurn;
  }

  function getScrollContainer(element) {
    for (
      let parent = element.parentElement;
      parent && parent !== document.body;
      parent = parent.parentElement
    ) {
      const overflowY = getComputedStyle(parent).overflowY;
      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        parent.scrollHeight > parent.clientHeight
      ) {
        return parent;
      }
    }

    return document.scrollingElement;
  }

  saveButton.addEventListener("click", () => {
    const turn = getClosestTurn();

    if (!turn) {
      status.textContent = "No conversation messages found.";
      return;
    }

    const scrollContainer = getScrollContainer(turn);
    bookmark = {
      scrollContainer,
      scrollTop: scrollContainer.scrollTop,
      windowScrollY: window.scrollY
    };
    returnButton.disabled = false;
    status.textContent = "Position saved.";
  });

  returnButton.addEventListener("click", () => {
    if (!bookmark) {
      status.textContent = "Save a position first.";
      return;
    }

    if (
      bookmark.scrollContainer.isConnected &&
      bookmark.scrollContainer !== document.scrollingElement
    ) {
      bookmark.scrollContainer.scrollTo({
        top: bookmark.scrollTop,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: bookmark.windowScrollY,
        behavior: "smooth"
      });
    }

    status.textContent = "Returning to your saved position.";
  });
})();