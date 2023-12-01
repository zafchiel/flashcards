export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("span");
  const mouseOver = () => {
    tooltip.innerText = params.content;

    tooltip.className =
      "variant-filled text-sm fixed min-w-max p-2 z-10 rounded-md pointer-events-none";
    element.appendChild(tooltip);
  };

  const mouseMove = (event: MouseEvent) => {
    tooltip.style.top = `${event.pageY + 5}px`;
    tooltip.style.left = `${event.pageX + 5}px`;
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
