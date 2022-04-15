import Model from "./model";

export default class User extends Model {
  default = {
    id: '?',
    isLogined: false,
    username: "",
    password: "",
    email: "",
    firstName: "",
    secondName: "",
    address: "",
    phone: "",
    birthdate: "",
  }

  toNetworkNames = {
    username: "username",
    email: "email",
    password: "password",
    firstName: "firstName",
    secondName: "lastName",
  }

  set(data) {
    super.set(data);
    this.isLogined = true;
  }

  constructor() {
    super();
    this.setDefault();
  }
}
