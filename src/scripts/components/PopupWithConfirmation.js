import { Popup } from './Popup.js'

export class PopupWithConfirmation extends Popup {
  _confirmButton;

  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  open({ onConfirm }) {
    this._handleConfirm = onConfirm;
    super.open();
  }

  close() {
    this._handleConfirm = undefined;
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm();
      this.close();
    });
  }
}