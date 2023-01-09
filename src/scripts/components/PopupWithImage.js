import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = this._popup.querySelector('.popup__card-image');
    this._popupCardTitle = this._popup.querySelector('.popup__card-title');
  }

  open(data) {
    super.open();//вызываем родительский метод
    this._popupCardImage.src = data.link;
    this._popupCardImage.alt = data.name;
    this._popupCardTitle.textContent = data.name;
  }
}