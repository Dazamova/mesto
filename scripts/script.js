const popups = document.querySelectorAll('.popup');
const popupEditData = document.querySelector('.popup_edit-data');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
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

const cardsContainer = document.querySelector('.cards'); //контейнер, в который добавляем карточки
const cardTemplate = document.querySelector('.card-template').content.children[0]; //получаем ноду
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};



//функция создания карточки
function createCard(name, link) { //name и link для того, чтобы вместо них можно было указывать любые значения переменных для остальных функций
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  deleteButton.addEventListener('click', function () {
    card.remove();
  });
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
  });

  cardImage.addEventListener('click', function () {
    openPopup(popupOpenCard);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardTitle.textContent = name;
  });
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  // cardsContainer.prepend(card);
  return card;
}

function renderCard(name, link, container) {
  const cardItem = createCard(name, link); //создаем ноду типа элемент
  container.prepend(cardItem); //вставляем элемент в контейнер
}

//функция загрузки карточек по умолчанию
function createInitialCards() {
  initialCards.forEach(function (item) {
    renderCard(item.name, item.link, cardsContainer); //вставляем каждый элемент массива в контейнер
  });
}

createInitialCards(); //загружаем карточки по умолчанию

//функция добавления карточек пользователя
function addCard(evt) {
  evt.preventDefault();
  renderCard(inputPlace.value, inputImage.value, cardsContainer);
  closePopup(popupAddData);
}
//функция сброса ошибки (постараться сделать рефакторинг)
const hideError = () => {
  errors.forEach(function (item) {
    item.classList.remove('popup__error_visible');
    item.textContent = '';
  });
  inputs.forEach(function (item) {
    item.classList.remove('popup__input_type_error');
  });
};

// функция открытия (попап)
function openPopup(pop) {
  pop.classList.add('popup_opened');
};

// функция закрытия (попап)
function closePopup() {
  popups.forEach(function (item) { //for each, потому что там нод лист для попапов, их несколько, и им нельзя применить функции вроде remove
    item.classList.remove('popup_opened');
  });
  hideError();
};

// функция изменения имени и инфо о себе
function editData(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAboutYourself.value;
  closePopup(popupEditData);
}

// слушатели событий
editButton.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAboutYourself.value = profileAboutYourself.textContent;
  // formEditingData.submit.setAttribute('disabled', 'disabled');
  openPopup(popupEditData);
});

addButton.addEventListener('click', function () {
  formAddData.reset();
  // formAddData.submit.setAttribute('disabled', 'disabled');
  openPopup(popupAddData);
});

closeButtons.forEach(function (item) {
  item.addEventListener('click', closePopup);
});

popups.forEach(function (item) {
  item.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  });
});

// popups.forEach(function (item) {
//   item.addEventListener('keydown', function (event) {
//     if (event.key === "Escape") {
//       closePopup();
//     }
//   });
// });

function handleEscUp(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
};

document.addEventListener('keydown', handleEscUp);

formEditingData.addEventListener('submit', editData); //при отправке формы выполняется функция "редактировать данные"
formAddData.addEventListener('submit', addCard); //при отправке формы выполняется функция "добавить карточку"

//передача объекта config в файл с валидацией
enableValidation(config);