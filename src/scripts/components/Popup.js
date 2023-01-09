export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // this._handleEscClose = this._handleEscClose.bind(this);
  }

  //стрелочная функция, чтобы не терялся контекст this
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    };
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //слушатель клика иконке закрытия попапа, и затемнённой области вокруг формы
  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}