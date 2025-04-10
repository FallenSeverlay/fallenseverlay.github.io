import { AbstractComponent } from "./abstract-component.js";


function createHeaderComponentTemplate() {
    return (
        `<h1>Список задач</h1>`
      );
}


export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
