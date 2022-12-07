export class Card {
  _link;
  _name;
  _selector;
  _cardElement
  _card;
  _cardImage;
  _cardTitle;
  _deleteButton;
  _likeButton;
  _onClick;

  constructor(name, link, selector, onClick) { //какие-то данные name и link, которые приходят извне, и записываются в свойства _name и _link класса Card
    this._name = name;
    this._link = link;
    this._onClick = onClick; //извне передается функция, через нее можно передать параметры
    this._selector = selector;
  }

  // constructor(name, link, onClick) { //какие-то данные name и link, которые приходят извне, и записываются в свойства _name и _link класса Card
  //     this._name = name;
  //     this._link = link;
  //     this._onClick = onClick; //извне передается функция, через нее можно передать параметры
  // }

  _cardImageClick() {
    this._onClick(this._name, this._link);
  }

  _getTemplate() {
    //забираю разметку из html и клонирую элемент
    const _cardElement = document
      .querySelector(this._selector)
      // .querySelector('.card-template')
      .content
      .children[0]
      .cloneNode(true);

    return _cardElement; //возвращаю DOM-элемент карточки
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      // this._removeCard();
      this._card.remove();
    });

    this._likeButton.addEventListener('click', () => {
      // this._like();
      this._likeButton.classList.toggle('card__like-button_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._cardImageClick();
    });
  }

  render() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._likeButton = this._card.querySelector('.card__like-button');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
  // _removeCard() {
  //   this._card.remove();
  // }

  // _like() {
  //   this._likeButton.classList.toggle('card__like-button_active');
  // }
}