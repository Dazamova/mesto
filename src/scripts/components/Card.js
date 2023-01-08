export class Card {
  _link;
  _name;
  _id;
  _selector;
  _cardElement;
  _card;
  _cardImage;
  _cardTitle;
  _deleteButton;
  _likeButton;

  constructor(data, selector, handleCardClick, onRemove, onLike, onDislike, userId) {
    this.data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;//извне передается функция, через нее можно передать параметры
    this._onRemove = onRemove;
    this._onLike = onLike;
    this._onDislike = onDislike;
    this._ownerCardId = data.owner._id;
    this._userId = userId;

    this._handleLike = this._handleLike.bind(this);
    this._handleDislike = this._handleDislike.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
  }

  _handleLike() {
    this._onLike(this);
  }

  _handleDislike() {
    this._onDislike(this);
  }

  _handleRemove() {
    // this._onRemove(this._data._id);
    this._onRemove(this);
  }

  removeCard() {
    this._card.remove();
  }

  countLikes() {
    this._likeCounter.textContent = this.data.likes.length;
  }
  like() {
    this._likeButton.classList.add('card__like-button_active');
  }

  dislike() {
    this._likeButton.classList.remove('card__like-button_active');
  }
  _findUserId() {
    return this.data.likes.some((res) => res._id === this._userId);
  }

  //собирает в одном месте логику лайка
  _cardLike() {
    this.countLikes();

    if (this._findUserId()) {
      this.like();
    } else {
      this.dislike();
    };
  }

  _cardImageClick() {
    this._handleCardClick(this.data);
  }

  _getTemplate() {
    //забираю разметку из html и клонирую элемент
    const _cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return _cardElement; //возвращаю DOM-элемент карточки
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleRemove();
      // this._removeCard();
    });

    this._likeButton.addEventListener('click', () => {
      if (!this._findUserId()) {
        this._handleLike();
      } else {
        this._handleDislike();
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._cardImageClick();
    });
  }

  render() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._likeButton = this._card.querySelector('.card__like-button');
    this._likeCounter = this._card.querySelector('.card__likes-counter');
    this._deleteButton = this._card.querySelector('.card__delete-button');
    if (this._userId !== this._ownerCardId) {
      this._deleteButton.remove()
    };

    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.name;
    this._cardTitle.textContent = this.data.name;

    this._setEventListeners();
    this._cardLike();

    return this._card;
  }
}