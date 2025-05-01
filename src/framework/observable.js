export default class Observable {

    #observable = new Set();

    addObservable(observer) {
        this.#observable.add(observer);
    }

    removeObserver(observer) {
        this.#observable.delete(observer);
    }

    _notify(event, payload) {
        this.#observable.forEach((observer) => observer(event, payload));
    }
}