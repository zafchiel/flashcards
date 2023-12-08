export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("span");
  const mouseOver = () => {
    tooltip.innerText = params.content;

    tooltip.className =
      "variant-filled text-sm fixed hidden min-w-max p-2 z-10 rounded-md pointer-events-none";
    document.body.appendChild(tooltip);
    setTimeout(() => {
      tooltip.classList.remove("hidden");
    }, 400)
  };

  const mouseMove = (event: MouseEvent) => {
    tooltip.style.top = `${event.pageY + 7}px`;
    tooltip.style.left = `${event.pageX + 7}px`;
  };

  const mouseOut = () => {
    tooltip.remove();
  };

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mousemove", mouseMove);
  element.addEventListener("mouseout", mouseOut);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseout", mouseOut);
    },
  };
};
