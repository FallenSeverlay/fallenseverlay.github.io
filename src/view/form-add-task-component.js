import { AbstractComponent } from "./abstract-component.js";


function createAddTaskComponentTemplate() {
    return (
        `<div class="task-form">
            <h2>Новая задача</h2>
            <input type="text" placeholder="Название задачи...">
            <button class="add-new-task-button">+ Добавить</button>
        </div>`
      );
}


export default class AddTaskComponent extends AbstractComponent {
  get template() {
    return createAddTaskComponentTemplate();
  }
}
