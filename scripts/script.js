let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');
let inputName = document.querySelector('.popup__input_type_name');
let inputAboutYourself = document.querySelector('.popup__input_type_about-yourself');
let dataEditing = document.querySelector('.popup__data-editing');


// функция открытия "редактирование данных профиля"
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAboutYourself.value = profileAboutYourself.textContent;
}

// функция закрытия "редактирование данных профиля"
function closePopup() {
  popup.classList.remove('popup_opened');
}

// функция изменения имени и инфо о себе
function editData(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAboutYourself.value;
  closePopup();
}

// слушатели событий
editButton.addEventListener('click', openPopup);
dataEditing.addEventListener('submit', editData);
closeButton.addEventListener('click', closePopup);