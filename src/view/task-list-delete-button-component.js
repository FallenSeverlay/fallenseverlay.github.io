import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskListDeleteButtonComponentTemplate() {
    return `<button class="delete-button">✕ Очистить</button>`
}

export default class TaskListDeleteButtonComponent extends AbstractComponent {
  get template() {
    return createTaskListDeleteButtonComponentTemplate();
  }
}