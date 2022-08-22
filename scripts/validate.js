
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {// функция, которая добавляет инпуту element класс с ошибкой
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  inputElement.classList.remove(inputErrorClass);// функция, которая удаляет класс с ошибкой
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля inputElement формы formElement
const isValid = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListener = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, rest);
  });
};