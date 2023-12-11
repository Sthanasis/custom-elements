function heightToTopOffset(height: number) {
  return window.innerHeight - height;
}

function vhToPixels(height: number) {
  return window.innerHeight * (height / 100);
}

export { heightToTopOffset, vhToPixels };
