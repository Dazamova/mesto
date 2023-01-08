export class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/users/me`, {
        method: 'GET',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getInitialCards() {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/cards`, {
        method: 'GET',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editProfile(profile) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: profile.name,
          about: profile.aboutYourself,
        })
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addCard(card) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: card.place,
          link: card.image,
        })
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async like(id) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
        method: 'PUT',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async dislike(id) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteCard(id) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editAvatar(profile) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/cohort-56/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: profile.avatar,
        })
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}