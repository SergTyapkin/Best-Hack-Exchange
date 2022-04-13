import ApiRequest from "./utils/requests";

export default class Api extends ApiRequest {
    signUp = (username, email, password, fullname) => this.post('/users', {username, email, password, fullname});
    signIn = (username, password) => this.post('/user/auth', {username, password});
    getUser = () => this.get('/user');
    updateUser = (userInfo) => this.put('/user', userInfo);
    signOut = () => this.delete('/user/session');
    updatePassword = (oldPassword, newPassword) => this.put('/user/password', {oldPassword, newPassword});
}
