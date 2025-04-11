import {createElement} from "../render.js";


function createTaskListItemComponentTemplate(task) {
  const {title, status} = task;
    return (
        `<li class="item">
          <span class="task-title">${title}</span>
          <button aria-label="Изменить" class="task-edit-button" type="button" title="Изменить">✏️</button>
        </li>`
      );
}


export default class TaskListItemComponent {
  constructor({task}) {
    this.task = task;
    this.element = null;
  }

  getTemplate() {
    return createTaskListItemComponentTemplate(this.task);
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