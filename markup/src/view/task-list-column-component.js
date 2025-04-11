import {createElement} from "../render.js";


function createTaskListColumnComponentTemplate(className, title) {
    return (
        `<li class="${className} column">
					<span class="title">${title}</span>
					<ul class="${className}__inner">
					</ul>
				</li>`
      );
}


export default class TaskListColumnComponent {
  constructor(className, title) {
    this.className = className;
    this.title = title;
    this.element = null;
  }

  getTemplate() {
    return createTaskListColumnComponentTemplate(this.className, this.title);
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}