const popups = document.querySelectorAll('.popup');
const popupEditData = document.querySelector('.popup_edit-data');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const inputName = document.querySelector('.popup__input_type_name');
const inputAboutYourself = document.querySelector('.popup__input_type_about-yourself');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputImage = document.querySelector('.popup__input_type_image');
const editingData = document.querySelector('.popup__data-editing');
const addData = document.querySelector('.popup__add-data');
const popupAddData = document.querySelector('.popup_add-data');
const addButton = document.querySelector('.profile__add-button');
const popupOpenCard = document.querySelector('.popup_open-card');
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardTitle = document.querySelector('.popup__card-title');
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


// функция открытия (попап)
function openPopup(pop) {
  pop.classList.add('popup_opened');
}

// функция закрытия (попап)
function closePopup() {
  popups.forEach(function (item) { //for each, потому что там нод лист для попапов, их несколько, и им нельзя применить функции вроде remove
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

closeButtons.forEach(function (item) {
  item.addEventListener('click', closePopup);
});

editingData.addEventListener('submit', editData);
addData.addEventListener('submit', addCard);