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
    getStocks = () => {
        return {
            ok_: true,
            stocks: [
                {
                    name: 'ARP',
                    value: 1.9678,
                    isIncrease: true,
                    percents: 12.5,
                    isSelected: true,
                },
                {
                    name: 'ETH',
                    value: 23.234,
                    isIncrease: false,
                    percents: -5.235,
                },
                {
                    name: 'LTC',
                    value: 380.234,
                    isIncrease: true,
                    percents: 39.69,
                },
            ]
        }
    }//this.get('/portfolio/stocks');
    getStockByName = (name) => this.get(`/portfolio/stocks/${name}`);
    portfolioHistory = (from, to) => this.get('/portfolio/history' ,{from, to});
    buyStock = (name, value) => this.post('/portfolio/stocks/buy' ,{name, value});
    sellStock = (name, value) => this.post('/portfolio/stocks/sell' ,{name, value});

    //stats
    getLineStats = (name, interval, from) => {
        return {
            ok_: true,
            data: [
                {
                    date: '12.32.3',
                    value: '100'
                },
                {
                    date: '12.39.3',
                    value: '130'
                },
                {
                    date: '11.36.1',
                    value: '120'
                },
                {
                    date: '12.08.0',
                    value: '90'
                }
            ]
        }
    }//this.get('/stats/line', {name, interval, from});
    getCandlesStats = (name, interval, from) => this.get(`/stats/candles`, {name, interval, from});
}
