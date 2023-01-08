import './pages/index.css';
import { Card } from './scripts/components/Card.js';
import { FormValidator } from './scripts/components/FormValidator.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { PopupWithConfirmation } from './scripts/components/PopupWithConfirmation.js';
import { Section } from './scripts/components/Section.js';
import { UserInfo } from './scripts/components/UserInfo.js';
import { Api } from './scripts/components/Api.js';
import {
  popupEditProfileSelector,
  editButton,
  profileName,
  profileAboutYourself,
  profileAvatar,
  profileAvatarContainer,
  formEditProfile,
  inputName,
  inputAboutYourself,
  formAddCard,
  popupAddCardSelector,
  addButton,
  popupUpdateAvatarSelector,
  formUpdateAvatar,
  popupOpenCardSelector,
  cardsContainerSelector,
  cardSelector,
  popupWithConfirmationSelector,

  validationConfig,
  apiConfig
} from './scripts/utils/constants.js';

let userId; //в эту глобальную переменную запишем данные id пользователя

const userInfo = new UserInfo(profileName, profileAboutYourself);
const api = new Api(apiConfig);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, data]) => {
    userId = data._id;
    userInfo.setUserInfo({ name: data.name, aboutYourself: data.about });
    profileAvatar.src = data.avatar;
    cardsList.renderItems(cards);
  }).catch(rej => {
    console.log(rej)
  });

//попап открытия карточки по клику
const popupWithImage = new PopupWithImage(popupOpenCardSelector);
popupWithImage.setEventListeners();

//попап подтверждения удаления ("Вы уверены?")
const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector);
popupWithConfirmation.setEventListeners();

//функция создания карточек
function createCard(data) {
  const card = new Card(data, cardSelector,
    (data) => {
      popupWithImage.openPopup(data); //перезаписанный метод openPopup для потомка Popup
    },
    async (card) => {
      popupWithConfirmation.openPopup({
        onConfirm: () => {
          api.deleteCard(card.data._id);
          card.removeCard();
        }
      });
    },
    async (card) => {
      api.like(card.data._id).then((res) => {
        card.data = res;
        card.countLikes();
        card.like();
      }).catch(rej => {
        console.log(rej)
      });
    },
    async (card) => {
      api.dislike(card.data._id).then((res) => {
        card.data = res;
        card.countLikes();
        card.dislike();
      }).catch(rej => {
        console.log(rej)
      });
    },
    userId
  );
  return card.render();//создаем ноду типа элемент
}

//  добавляем карточки
const cardsList = new Section(
  {
    renderer: (item) => { cardsList.addItem(createCard(item)) }
  }, cardsContainerSelector);

//"добавление карточек пользователя"
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();

const popupAddCard = new PopupWithForm((formData) => {
  api.addCard(formData).then((card) => {
    cardsList.addItem(createCard(card));
  })
    .catch((err) => renderError(`Ошибка: ${err}`))
    .finally(() => popupAddCard.dataLoading(false, "Создать"))
}, popupAddCardSelector);
popupAddCard.setEventListeners();

addButton.addEventListener('click', function () {
  formAddCardValidator.resetValidation();
  popupAddCard.openPopup();
});

//"редактирование профиля"
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm((formData) => {
  api.editProfile(formData).then((data) => {
    userInfo.setUserInfo({ name: data.name, aboutYourself: data.about });
  })
    .catch((err) => renderError(`Ошибка: ${err}`))
    .finally(() => popupEditProfile.dataLoading(false, "Сохранить"))
}, popupEditProfileSelector);
popupEditProfile.setEventListeners();

editButton.addEventListener('click', function () {
  formEditProfileValidator.resetValidation();
  const { name, aboutYourself } = userInfo.getUserInfo();
  inputName.value = name;
  inputAboutYourself.value = aboutYourself;
  popupEditProfile.openPopup();
});

//"обновление аватара"
const formUpdateAvatarValidator = new FormValidator(validationConfig, formUpdateAvatar);
formUpdateAvatarValidator.enableValidation();

const popupUpdateAvatar = new PopupWithForm((formData) => {
  api.editAvatar(formData).then((data) => {
    profileAvatar.src = data.avatar;
  })
    .catch((err) => renderError(`Ошибка: ${err}`))
    .finally(() => popupUpdateAvatar.dataLoading(false, "Сохранить"))
}, popupUpdateAvatarSelector);
popupUpdateAvatar.setEventListeners();

profileAvatarContainer.addEventListener('click', function () {
  formUpdateAvatarValidator.resetValidation();
  popupUpdateAvatar.openPopup();
})