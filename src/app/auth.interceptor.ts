import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private auth: AuthService) {
        // Do Nothing..
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = new Date();
        const token = localStorage.getItem('token');
        let clone: HttpRequest<any>;

        if (token) {
            clone = request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            clone = request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }

        return next.handle(clone).map((response) => {
            return response;
        }).catch((error) => {
            if (this.isUnauthorized(error.status)) {
                this.auth.logout();
                this.router.navigate(['/login']);
            }

            if (error instanceof HttpErrorResponse && error.error instanceof Blob && error.error.type === 'application/json') {
                return new Promise<any>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e: Event) => {
                        try {
                            const errmsg = JSON.parse((e.target as any).result);
                            reject(errmsg);
                            // reject(new HttpErrorResponse({
                            //     error: errmsg,
                            //     headers: error.headers,
                            //     status: error.status,
                            //     statusText: error.statusText,
                            //     url: error.url
                            // }));
                        } catch (e) {
                            reject(error);
                        }
                    };
                    reader.onerror = (e) => {
                        reject(error);
                    };
                    reader.readAsText(error.error);
                });
            }

            return Observable.throw(error.error);
        });
    }

    private isUnauthorized(status: number): boolean {
        return status === 0 || status === 401 || status === 403;
    }
}
