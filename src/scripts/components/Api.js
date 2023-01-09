export class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _responseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/v1/cohort-56/users/me`, {
      method: 'GET',
      headers: this.headers
    }).then((res) => {return this._responseStatus(res)});
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/v1/cohort-56/cards`, {
      method: 'GET',
      headers: this.headers
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  editProfile(profile) {
    return fetch(`${this.baseUrl}/v1/cohort-56/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.aboutYourself,
      })
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  addCard(card) {
    return fetch(`${this.baseUrl}/v1/cohort-56/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.place,
        link: card.image,
      })
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  like(id) {
    return fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  dislike(id) {
    return fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }

  editAvatar(profile) {
    return fetch(`${this.baseUrl}/v1/cohort-56/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: profile.avatar,
      })
    }).then((res) => {return this._responseStatus(res)});
    // .then((data) => {
    //   return data;
    // })
  }
}