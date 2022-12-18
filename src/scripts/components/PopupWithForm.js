import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  _inputList;
  _formValues;
  _popupForm;
  _buttonElement;

  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //принимает в конструктор колбэк сабмита формы
  }

  //собираем данные из полей
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input'); //собираю все элементы полей этого попапа
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonElement = this._popup.querySelector('.popup__save-button');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    this._popupForm.reset();
    super.closePopup();

  }
}