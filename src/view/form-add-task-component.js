import { AbstractComponent } from "./abstract-component.js";


function createAddTaskComponentTemplate() {
    return (
        `<form  class="task-form">
            <h2>Новая задача</h2>
            <input class="add-new-task-input" type="text" placeholder="Название задачи...">
            <button class="add-new-task-button" type="submit">+ Добавить</button>
        </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }

  get template() {
    return createAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}
