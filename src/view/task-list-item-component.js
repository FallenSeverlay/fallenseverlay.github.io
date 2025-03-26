import {createElement} from "../render.js";


function createTaskListItemComponentTemplate(name) {
    return (
        `<li class="item">${name}</li>`
      );
}


export default class TaskListItemComponent {
  constructor(name) {
    this.name = name;
    this.element = null;
  }

  getTemplate() {
    return createTaskListItemComponentTemplate(this.name);
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