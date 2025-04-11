import {createElement} from "../render.js";


function createTaskListItemComponentTemplate() {
    return (
        `<ul class="columns"></ul>`
      );
}


export default class TaskListItemComponent {
  getTemplate() {
    return createTaskListItemComponentTemplate();
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