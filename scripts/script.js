let popup = document.querySelector('.popup');
let profileInfo = document.querySelector('.profile__info');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');

function openPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

// функция изменения имени и инфо о себе
let profileName = document.querySelector('.profile__name');
let profileAboutYourself = document.querySelector('.profile__about-yourself');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.querySelector('.popup__name');
    let aboutYourself = document.querySelector('.popup__about-yourself');
    profileName.textContent = name.value;
    profileAboutYourself.textContent = aboutYourself.value;
    closePopup();
}

saveButton.addEventListener('click', formSubmitHandler);