const contentTrack = document.querySelector(".content__track");

if (contentTrack) {
  let dragStartX = 0;
  let scrollStartX = 0;
  let activePointerId = null;
  let hasDragged = false;

  contentTrack.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    scrollStartX = contentTrack.scrollLeft;
    hasDragged = false;
    contentTrack.setPointerCapture(activePointerId);
  });

  contentTrack.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;

    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 4) {
      hasDragged = true;
      contentTrack.classList.add("is-dragging");
    }
    if (hasDragged) contentTrack.scrollLeft = scrollStartX - distance;
  });

  const endDrag = (event) => {
    if (event.pointerId !== activePointerId) return;

    contentTrack.classList.remove("is-dragging");
    if (contentTrack.hasPointerCapture(activePointerId)) {
      contentTrack.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
  };

  contentTrack.addEventListener("pointerup", endDrag);
  contentTrack.addEventListener("pointercancel", endDrag);
  contentTrack.addEventListener("lostpointercapture", endDrag);
}
