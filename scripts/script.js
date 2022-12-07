import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEditData = document.querySelector('.popup_edit-data');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const formEditingData = document.forms.editingData;
const inputName = editingData.elements.name;
const inputAboutYourself = editingData.elements.aboutYourself;
const formAddData = document.forms.addData;
const inputPlace = addData.elements.place;
const inputImage = addData.elements.image;
const popupAddData = document.querySelector('.popup_add-data');
const addButton = document.querySelector('.profile__add-button');
const popupOpenCard = document.querySelector('.popup_open-card');
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardTitle = document.querySelector('.popup__card-title');
const cardsContainer = document.querySelector('.cards'); //контейнер, в который добавляем карточки
const cardSelector = '.card-template';
const errors = document.querySelectorAll('.popup__error');
const inputs = document.querySelectorAll('.popup__input');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// const cardTemplate = document.querySelector('.card-template').content.children[0]; //получаем ноду //+
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};



function renderCard(name, link, selector, container) {
  const card = new Card(name, link, selector, () => {
    openPopup(popupOpenCard);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardTitle.textContent = name;
  }); //создаем ноду типа элемент
  const cardItem = card.render();

  container.prepend(cardItem); //вставляем элемент в контейнер
}

//функция загрузки карточек по умолчанию
function createInitialCards() {
  initialCards.forEach((item) => {
    renderCard(item.name, item.link, cardSelector, cardsContainer); //вставляем каждый элемент массива в контейнер
  });
}

createInitialCards(); //загружаем карточки по умолчанию

//функция "добавление карточек пользователя"
function addCard(evt) {
  evt.preventDefault();
  renderCard(inputPlace.value, inputImage.value, cardSelector, cardsContainer);
  closePopup(popupAddData);
}

// функция открытия (попап)
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

// функция закрытия (попап)
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
};

// функция изменения имени и инфо о себе
function editData(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAboutYourself.value;
  closePopup(popupEditData);
}

//функция сброса ошибки (постараться сделать рефакторинг)
const hideError = () => {
  errors.forEach(function (item) {
    item.classList.remove(config.errorClass);
    item.textContent = '';
  });
  inputs.forEach(function (item) {
    item.classList.remove(config.inputErrorClass);
  });
};

// слушатели событий
//открытие попапа "редактирование профиля"
editButton.addEventListener('click', function () {
  const formEditingDataValidator = new FormValidator(config, formEditingData);
  formEditingDataValidator.enableValidation();
  inputName.value = profileName.textContent;
  inputAboutYourself.value = profileAboutYourself.textContent;
  formEditingData.elements.submit.setAttribute('disabled', 'disabled');
  formEditingData.elements.submit.classList.add('popup__save-button_disabled');
  hideError();
  openPopup(popupEditData);
});

//открытие попапа "добавление карточек пользователя"
addButton.addEventListener('click', function () {
  const formAddDataValidator = new FormValidator(config, formAddData);
  formAddData.reset();
  formAddDataValidator.enableValidation();
  formAddData.elements.submit.setAttribute('disabled', 'disabled');
  formAddData.elements.submit.classList.add('popup__save-button_disabled');
  hideError();
  openPopup(popupAddData);
});

//закрытие по нажанию на крестик
popups.forEach(function (item) {
  item.addEventListener('click', function (event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  });
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// document.addEventListener('keydown', handleEscUp);

formEditingData.addEventListener('submit', editData); //при отправке формы выполняется функция "редактировать данные"
formAddData.addEventListener('submit', addCard); //при отправке формы выполняется функция "добавить карточку"