import './pages/index.css';
import { Card } from './scripts/components/Card.js';
import { FormValidator } from './scripts/components/FormValidator.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { Section } from './scripts/components/Section.js';
import { UserInfo } from './scripts/components/UserInfo.js';
import {
  popupEditProfileSelector,
  editButton,
  profileName,
  profileAboutYourself,
  formEditProfile,
  inputName,
  inputAboutYourself,
  formAddCard,
  popupAddCardSelector,
  addButton,
  popupOpenCardSelector,
  cardsContainerSelector,
  cardSelector,
  initialCards,
  validationConfig
} from './scripts/utils/constants.js';

const popupWithImage = new PopupWithImage(popupOpenCardSelector);
popupWithImage.setEventListeners();

//функция создания карточек
function createCard(name, link) {
  const card = new Card(name, link, cardSelector,
    (name, link) => {
      popupWithImage.openPopup(name, link);
    }
  ); //создаем ноду типа элемент
  return card.render();
}

//добавляем карточки по умолчанию
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => { cardsList.addItem(createCard(item.name, item.link)); }
  }, cardsContainerSelector);

//отрисовываем карточки по умолчанию
cardsList.renderItems();


//"добавление карточек пользователя"
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();

const popupAddCard = new PopupWithForm((formData) => {
  cardsList.addItem(createCard(formData.place, formData.image));
}, popupAddCardSelector);
popupAddCard.setEventListeners();

addButton.addEventListener('click', function () {
  formAddCardValidator.resetValidation();
  popupAddCard.openPopup();
});

//"редактирование профиля"
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();

const userInfo = new UserInfo(profileName, profileAboutYourself);

const popupEditProfile = new PopupWithForm((formData) => {
  userInfo.setUserInfo(formData);
  // profileName.textContent = formData.name;
  // profileAboutYourself.textContent = formData.aboutYourself;
}, popupEditProfileSelector);
popupEditProfile.setEventListeners();

editButton.addEventListener('click', function () {
  formEditProfileValidator.resetValidation();
  const {name, aboutYourself} = userInfo.getUserInfo();
  inputName.value = name;
  inputAboutYourself.value = aboutYourself; 
  popupEditProfile.openPopup();
});