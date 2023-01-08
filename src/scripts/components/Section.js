export class Section {
  // класс Section отвечает за отрисовку элементов на странице
  // нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
  _container
  _renderer

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  // метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}