import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  _inputList;
  _formValues;
  _popupForm;
  _handleFormSubmit;

  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //принимает в конструктор колбэк сабмита формы
    this._inputList = this._popup.querySelectorAll('.popup__input'); //собираю все элементы полей этого попапа
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  //собираем данные из полей
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    this._popupForm.reset();
    super.closePopup();

  }
}