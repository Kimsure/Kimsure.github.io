function copyTextFromTarget(targetId, button) {
  const node = document.getElementById(targetId);
  if (!node) return;

  const text = node.innerText.trim();
  const resetLabel = () => {
    window.setTimeout(() => {
      button.textContent = "Copy";
    }, 1200);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      button.textContent = "Copied!";
      resetLabel();
    }).catch(() => fallbackCopy(text, button, resetLabel));
    return;
  }

  fallbackCopy(text, button, resetLabel);
}

function fallbackCopy(text, button, resetLabel) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    button.textContent = "Copied!";
  } catch (error) {
    button.textContent = "Failed";
  }

  document.body.removeChild(textarea);
  resetLabel();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy-target]");
  if (!button) return;
  copyTextFromTarget(button.dataset.copyTarget, button);
});
