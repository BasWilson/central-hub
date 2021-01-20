import { makeAutoObservable, action } from 'mobx';

export class UserStore {

    authenticated: boolean = false;
    user: any;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setAuthenticated = (authenticated: boolean) => {
        this.authenticated = authenticated;
    }

    @action
    setUser = (user: any) => {
        this.user = user;
    }
}