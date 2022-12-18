export class UserInfo {
  constructor(name, aboutYourself) {
    this._name = name;
    this._aboutYourself = aboutYourself;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      aboutYourself: this._aboutYourself.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._aboutYourself.textContent = data.aboutYourself;
  }
}