import './pages/index.css';
import { Card } from './scripts/components/Card.js';
import { FormValidator } from './scripts/components/FormValidator.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { Section } from './scripts/components/Section.js';
import { UserInfo } from './scripts/components/UserInfo.js';
import {
  popupEditData,
  editButton,
  profileName,
  profileAboutYourself,
  formEditingData,
  inputName,
  inputAboutYourself,
  formAddData,
  popupAddData,
  addButton,
  popupOpenCard,
  cardsContainer,
  cardSelector,
  initialCards,
  config
} from './scripts/utils/constants.js';

const popupWithImage = new PopupWithImage(popupOpenCard);
popupWithImage.setEventListeners();

//функция создания карточек
function createCard(name, link, selector) {
  const card = new Card(name, link, selector,
    (name, link) => {
      popupWithImage.openPopup(name, link);
    }
  ); //создаем ноду типа элемент
  const cardItem = card.render();
  return cardItem;
}

//добавляем карточки по умолчанию
const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => { initialCardsList.addItem(createCard(item.name, item.link, cardSelector)); }
  }, cardsContainer);

//отрисовываем карточки по умолчанию
initialCardsList.renderItems();


//"добавление карточек пользователя"
const formAddDataValidator = new FormValidator(config, formAddData);
formAddDataValidator.enableValidation();

const popupAddCard = new PopupWithForm((formData) => {
  initialCardsList.addItem(createCard(formData.place, formData.image, cardSelector));
}, popupAddData);
popupAddCard.setEventListeners();

addButton.addEventListener('click', function () {
  formAddDataValidator.resetValidation();
  popupAddCard.openPopup();
});

//"редактирование профиля"
const formEditingDataValidator = new FormValidator(config, formEditingData);
formEditingDataValidator.enableValidation();

const userInfo = new UserInfo(profileName, profileAboutYourself);

const popupEditProfile = new PopupWithForm((formData) => {
  userInfo.setUserInfo(formData);
  // profileName.textContent = formData.name;
  // profileAboutYourself.textContent = formData.aboutYourself;
}, popupEditData);
popupEditProfile.setEventListeners();

editButton.addEventListener('click', function () {
  formEditingDataValidator.resetValidation();
  inputName.value = userInfo.getUserInfo().name;
  inputAboutYourself.value = userInfo.getUserInfo().aboutYourself;
  popupEditProfile.openPopup();
});