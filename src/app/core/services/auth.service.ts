import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../global';
import { ConfigService } from './config.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    constructor(private jwtHelper: JwtHelperService) {
    }

    public login(user: any) {
        if (user && user.access_token) {
            localStorage.setItem('token', user.access_token);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        }
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
    }

    public isLoggedIn() {
        const token = localStorage.getItem('token');
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }
}
