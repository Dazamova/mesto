import { Popup } from './Popup.js'

export class PopupWithConfirmation extends Popup {
  _confirmButton;

  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  openPopup({ onConfirm }) {
    this._handleConfirm = onConfirm;
    super.openPopup();
  }

  closePopup() {
    this._handleConfirm = undefined;
    super.closePopup();
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm();
      this.closePopup();
    });
  }
}