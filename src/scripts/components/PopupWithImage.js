import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(data) {
    super.openPopup();//вызываем родительский метод
    const popupCardImage = document.querySelector('.popup__card-image');
    const popupCardTitle = document.querySelector('.popup__card-title');
    popupCardImage.src = data.link;
    popupCardImage.alt = data.name;
    popupCardTitle.textContent = data.name;
  }
}