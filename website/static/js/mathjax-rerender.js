(function () {
  var debounceTimer = null;

  function renderMath() {
    if (
      !window.MathJax ||
      typeof window.MathJax.typesetPromise !== "function"
    ) {
      return;
    }

    window.MathJax.typesetClear();
    window.MathJax.typesetPromise().catch(function (err) {
      console.error("MathJax render error:", err);
    });
  }

  function scheduleRender() {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(renderMath, 80);
  }

  // Initial render
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  // Re-render when SPA navigation changes URL
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    scheduleRender();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    scheduleRender();
  };

  window.addEventListener("popstate", scheduleRender);

  // Re-render when docs content is replaced in the DOM
  var observer = new MutationObserver(function () {
    scheduleRender();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
