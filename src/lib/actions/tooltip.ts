export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("div");
  const title = element.getAttribute("title");
  const mouseOver = () => {
    tooltip.textContent = params.content;
    element.removeAttribute("title");

    tooltip.className =
      "variant-filled-primary bg-primary-400 text-sm absolute p-2 z-10 rounded-md border pointer-events-none";
    element.appendChild(tooltip);
  };

  const mouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${event.clientY - rect.top}px`;
    tooltip.style.left = `${event.clientX - rect.left}px`;
  };

  const mouseOut = () => {
    tooltip.remove();
    if (title) element.setAttribute("title", title);
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