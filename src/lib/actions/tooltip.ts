export const tooltip = (element: HTMLElement) => {
    const tooltip = document.createElement("div");
    const mouseEnter = (event: MouseEvent) => {
        tooltip.style = `
            width: 1rem;
            height: 1rem;
            background: hotpink;
            position: fixed;
            top: ${event.pageY};
            left: ${event.pageX};
        `;
        element.appendChild(tooltip);
    }

    const mouseMove = (event: MouseEvent) => {
        tooltip.style.top = `${event.pageY}`;
        tooltip.style.left = `${event.pageX}`;
        
    }

    const mouseLeave = (event: MouseEvent) => {
        element.removeChild(tooltip)
    }

    element.addEventListener("mouseenter", mouseEnter)
    element.addEventListener("mousemove", mouseMove)
    element.addEventListener("mouseleave", mouseLeave)
    
    return {
        destroy() {
            element.removeEventListener("mouseenter", mouseEnter)
        }
    }
}