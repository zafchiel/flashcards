export const tooltip = (element: HTMLElement, params: { content: string }) => {
  const tooltip = document.createElement("div");
  const title = element.getAttribute("title");
  const mouseOver = () => {
    tooltip.textContent = params.content;
    element.removeAttribute("title");

    tooltip.className =
      "variant-filled-primary text-sm absolute p-2 rounded-md border m-0 pointer-events-none";
    tooltip.style.opacity = "1";
    tooltip.style.transition = "opacity 0.3s ease-in-out";
    element.appendChild(tooltip);
  };

  const mouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${event.clientY - rect.top}px`;
    tooltip.style.left = `${event.clientX - rect.left}px`;
  };

  const mouseOut = () => {
    tooltip.style.opacity = "0";
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
