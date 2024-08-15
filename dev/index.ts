const drawer = document.querySelector("bottom-drawer");
const btn = document
  .getElementById("button")
  ?.addEventListener("click", toggle);

function toggle() {
  const isOpen = drawer?.hasAttribute("open");

  if (!isOpen) drawer?.setAttribute("open", "");
  else drawer?.removeAttribute("open");
}
