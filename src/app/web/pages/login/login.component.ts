// import { IServerResponse } from './../../../core/interfaces/main/i-server-response';
import { AuthService } from './../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { ACTION, TYPE, DATE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Session } from 'app/core/utils/session';
import { CoreFactory } from 'app/core/factory/core.factory';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public model: any = {};
    public loading = false;
    public returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private factory: CoreFactory,
        private authenticationService: AuthService,
        private notification: NotificationsService) {
    }

    public ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public login() {
        this.loading = true;

        const api = this.factory.config().url('BE_SERVER') + 'auth/token';
        const body = {
            username: this.model.username,
            password: this.model.password
        };

        return this.factory.http()
            .post(api, body)
            .subscribe(
                (data) => {
                    this.authenticationService.login(data);
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    console.log(error);
                    // let errorResponse = error.error;// as IServerResponse;
                    this.loading = false;
                    this.notification.error(
                        'Error',
                        error.message
                    );
                });
    }
}
