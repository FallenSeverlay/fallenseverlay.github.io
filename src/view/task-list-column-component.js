import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskListColumnComponentTemplate(className, title) {
    return (
        `<li class="${className} column">
					<span class="title">${title}</span>
					<ul class="${className}__inner">
					</ul>
				</li>`
      );
}


export default class TaskListColumnComponent extends AbstractComponent {
  constructor(className, title, onTaskDrop) {
    super();
    this.className = className;
    this.title = title;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListColumnComponentTemplate(this.className, this.title);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element.querySelector(`.${this.className}__inner`);
    let placeholder = null;
  
    container.addEventListener("dragover", (evt) => {
      evt.preventDefault();
      const taskId = evt.dataTransfer.getData("text/plain");
  
      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
  
      const items = Array.from(container.querySelectorAll(".item"));
      let newIndex = items.length;
      const mouseY = evt.clientY;
      for (let i = 0; i < items.length; i++) {
        const { top, height } = items[i].getBoundingClientRect();
        if (mouseY < top + height) {
          newIndex = i;
          break;
        }
      }

      placeholder = document.createElement("li");
      placeholder.className = "drop-indicator";
      if (items[newIndex]) {
        container.insertBefore(placeholder, items[newIndex]);
      } else {
        container.appendChild(placeholder);
      }
    });
  
    container.addEventListener("drop", (evt) => {
      evt.preventDefault();
      const taskId = evt.dataTransfer.getData("text/plain");
      const all = Array.from(container.children);
      const dropIndex = all.indexOf(placeholder);
      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
      onTaskDrop(taskId, this.className, dropIndex);
    });
  
    container.addEventListener("dragleave", () => {
      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
    });
  }
}