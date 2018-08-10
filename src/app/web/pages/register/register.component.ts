import { AuthService } from './../../../core/services/auth.service';
import { AlertService } from './../../../core/services/alert.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    public model: any = {};
    public loading = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) { }

    public register() {
        this.loading = true;
        // this.authService.register(this.model)
        //     .subscribe(
        //         (data) => {
        //             // set success message and pass true paramater to persist the message
        //             // after redirecting to the login page
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         (error) => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
