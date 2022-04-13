import Model from "./model";

export default class User extends Model {
  default = {
    id: '?',
    isLogined: false,
    username: "",
    login: "",
    password: "",
    email: "",
    fullname: "",
  }

  toNetworkNames = {
    username: "username",
    email: "email",
    password: "password",
    fullname: "fullname",
  }

  set(data) {
    super.set(data);
    this.isLogined = true;
  }
}
