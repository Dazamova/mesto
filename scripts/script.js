let popup = document.querySelectorAll('.popup');
let popupEditData = document.querySelector('.popup_edit-data');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let inputName = document.querySelector('.popup__input_type_name');
let inputAboutYourself = document.querySelector('.popup__input_type_about-yourself');
let inputPlace = document.querySelector('.popup__input_type_place');
let inputImage = document.querySelector('.popup__input_type_image');
let editingData = document.querySelector('.popup__data-editing');
let addData = document.querySelector('.popup__add-data');
let popupAddData = document.querySelector('.popup_add-data');
let addButton = document.querySelector('.profile__add-button');
let popupOpenCard = document.querySelector('.popup_open-card');
let popupCardImage = document.querySelector('.popup__card-image');
let popupCardTitle = document.querySelector('.popup__card-title');
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
  cardsContainer.prepend(card);
}

//функция загрузки карточек по умолчанию
function createInitialcard() {
  initialCards.forEach(function (item) {
    createCard(item.name, item.link);
  });
}

createInitialcard(); //загружаем карточки по умолчанию

//функция добавления карточек пользователя
function addCard(evt) {
  evt.preventDefault();
  createCard(inputPlace.value, inputImage.value);
  closePopup(popupAddData);
}


// функция открытия (попап)
function openPopup(pop) {
  pop.classList.add('popup_opened');
}

// функция закрытия (попап)
function closePopup() {
  popup.forEach(function (item) { //for each, потому что там нод лист для попапов, их несколько, и им нельзя применить функции вроде remove
    item.classList.remove('popup_opened');
  });
}

// функция изменения имени и инфо о себе
function editData(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAboutYourself.value;
  closePopup(popupEditData);
}

// слушатели событий
editButton.addEventListener('click', function () {
  openPopup(popupEditData);
  inputName.value = profileName.textContent;
  inputAboutYourself.value = profileAboutYourself.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(popupAddData);
  inputPlace.value = '';
  inputImage.value = '';
});

closeButton.forEach(function (item) {
  item.addEventListener('click', closePopup);
});

editingData.addEventListener('submit', editData);
addData.addEventListener('submit', addCard);


//заготовки
// //для каждого элемента массива исполняем функцию - загрузку данных из массива:
// initialCards.forEach(function (item) {
//   const card = cardTemplate.cloneNode(true);
//   card.querySelector('.card__image').src = item.link;
//   card.querySelector('.card__image').alt = item.name;
//   card.querySelector('.card__title').textContent = item.name;
//   cardsContainer.append(card);
// });

// function addCard(evt) {
//   evt.preventDefault();

//   const card = cardTemplate.cloneNode(true);
//   card.querySelector('.card__image').src = inputImage.value;
//   card.querySelector('.card__image').alt = inputPlace.value;
//   card.querySelector('.card__title').textContent = inputPlace.value;
//   cardsContainer.prepend(card);
//   closePopup(popupAddData);
// }

// function addCard(evt) {
//   evt.preventDefault();

//   const card = cardTemplate.cloneNode(true);
//   card.querySelector('.card__image').src = inputImage.value;
//   card.querySelector('.card__image').alt = inputPlace.value;
//   card.querySelector('.card__title').textContent = inputPlace.value;
//   cardsContainer.prepend(card);
//   closePopup(popupAddData);
// }