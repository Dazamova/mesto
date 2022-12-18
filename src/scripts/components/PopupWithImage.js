import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(name, link) {
    super.openPopup();//вызываем родительский метод
    const popupCardImage = document.querySelector('.popup__card-image');
    const popupCardTitle = document.querySelector('.popup__card-title');
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardTitle.textContent = name;
  }
}