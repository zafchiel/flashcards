export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("div");
  const mouseOver = () => {
    tooltip.innerText = params.content;

    tooltip.className =
      "card variant-filled text-sm absolute min-w-max p-2 z-10 rounded-md pointer-events-none";
    element.appendChild(tooltip);
  };

  const mouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${event.clientY - rect.top + 5}px`;
    tooltip.style.left = `${event.clientX - rect.left + 5}px`;
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
