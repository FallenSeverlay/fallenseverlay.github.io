import {createElement} from "../render.js";


function createAddTaskComponentTemplate() {
    return (
        `<div class="task-form">
            <h2>Новая задача</h2>
            <input type="text" placeholder="Название задачи...">
            <button class="add-new-task-button">+ Добавить</button>
        </div>`
      );
}


export default class AddTaskComponent {
  getTemplate() {
    return createAddTaskComponentTemplate();
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
