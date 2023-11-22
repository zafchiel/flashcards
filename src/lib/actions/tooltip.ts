export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("div");
  const mouseOver = () => {
    tooltip.innerText = params.content;

    tooltip.className =
      "variant-filled-primary fixed p-2 rounded-md border transition-all";
    element.appendChild(tooltip);
  };

  const mouseMove = (event: MouseEvent) => {
    tooltip.style.top = `${event.clientY + 5}px`;
    tooltip.style.left = `${event.clientX + 5}px`;
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
