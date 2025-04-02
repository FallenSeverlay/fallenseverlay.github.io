import {createElement} from "../render.js";


function createTaskListDeleteButtonComponentTemplate() {
    return `<button class="delete-button">✕ Очистить</button>`
}

export default class TaskListDeleteButtonComponent {
  getTemplate() {
    return createTaskListDeleteButtonComponentTemplate();
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