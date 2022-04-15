import ApiRequest from "./utils/requests";

export default class Api extends ApiRequest {
    //user
    signIn = ({email, password}) => this.post('/user/signin', {email, password});
    signUp = ({username, email, password, firstName, lastName}) => this.post('/user', {username, email, password, firstName, lastName});
    updateUser = ({username, email, password, firstName, lastName}) => this.put('/user', {username, email, password, firstName, lastName});
    signOut = () => this.delete('/user/session');
    getUser = () => this.get('/user');

    //wallet
    topupWallet = (value) => this.post('/wallet/topup' ,{name: 'exCoin', value});
    withdrawWallet = (value) => this.post('/wallet/withdraw' ,{name: 'exCoin', value});
    walletHistory = (from, to) => this.get('/wallet/history' ,{from, to});

    //portfolio
    getStocks = () => this.get('/portfolio/stocks');
    getStockByName = (name) => this.get(`/portfolio/stocks/${name}`);
    portfolioHistory = (from, to) => this.get('/portfolio/history' ,{from, to});
    buyStock = (name, value) => this.post('/portfolio/stocks/buy' ,{name, value});
    sellStock = (name, value) => this.post('/portfolio/stocks/sell' ,{name, value});

    //stats
    getLineStats = (name, interval, from) => this.get('/stats/line', {name, interval, from});
    getCandlesStats = (name, interval, from) => this.get(`/stats/candles`, {name, interval, from});
}
