export class Session {

    public static getUserData(key: string) {
        return localStorage.getItem('loggedInUser') ?
            JSON.parse(localStorage.getItem('loggedInUser'))[key] : '';
    }

    public static getUserToken() {
        return 'bearer ' + Session.getUserData('access_token');
    }
}
