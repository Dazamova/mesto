export class FormValidator {
  _config;
  _validateForm;
  _inputList;
  _buttonElement;
  // _inputElement;
  _errors;
  _inputs;
  _errorElement;

  // // принимает в конструктор объект настроек с селекторами и классами формы;
  // // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, validateForm) {
    this._config = config;
    this._validateForm = validateForm;

  }
  // функция, которая добавляет инпуту element класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._validateForm.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._config.errorClass);
  }

  // функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    this._errorElement = this._validateForm.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля inputElement формы formElement
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  };

  _setEventListener() {
    this._inputList = Array.from(this._validateForm.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._validateForm.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement); //СЮДА НУЖНО ПЕРЕДАТЬ ДАННЫЕ О ЭЛЕМЕНТЕ ИНПУТА
        this._toggleButtonState();
      });
    });

    //выключатель кнопки,чтобы нельзя было несколько раз отправить карточку
    this._validateForm.addEventListener('submit', () => {
      this._buttonElement.setAttribute('disabled', 'disabled');
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
};