import { NotificationsService } from 'angular2-notifications';
import { INotification } from './../interfaces/main/i-notification';
// import { IServerResponse } from './../interfaces/main/i-server-response';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultNotificationService {
    public notificationOption: any;

    constructor(private _notification: NotificationsService) {
        this.notificationOption = {
            position: ['bottom', 'left'],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true,
            animate: 'fromRight'
          };
    }

    public setNotificationOption(notificationOption: INotification) {
        this.notificationOption = notificationOption;
    }

    public success(success: any) {
        this._notification.success(
            'Success',
            success.message ? success.message : 'No response message from server..',
            this.notificationOption
        );
    }

    public error(error: any) {
        let errorResponse = error;//.body as IServerResponse;
        this._notification.error(
            'Error',
            // error.body ? error.body.message :
            errorResponse.message ? errorResponse.message :
                    'No response message from server..',
            this.notificationOption
        );
    }

    public errorWithMessage(message: string) {
        this._notification.error(
            'Error',
            message,
            this.notificationOption
        );
    }
}
