export const popupEditProfileSelector = '.popup_edit-profile';
export const editButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileAboutYourself = document.querySelector('.profile__about-yourself');
export const formEditProfile = document.forms.editProfile;
export const inputName = editProfile.elements.name;
export const inputAboutYourself = editProfile.elements.aboutYourself;
export const formAddCard = document.forms.addCard;
export const popupAddCardSelector = '.popup_add-card';
export const addButton = document.querySelector('.profile__add-button');
export const popupOpenCardSelector = '.popup_open-card';
export const cardsContainerSelector = '.cards';
export const cardSelector = '.card-template';

export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};