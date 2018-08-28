import { Responses } from './../../utils/responses';
import { DefaultNotificationService } from './../default-notification.service';
import { IUploaderMaterials } from './../../interfaces/uploader/i-uploader-materials';
import { FileUploader } from 'ng2-file-upload';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ConfigService } from '../config.service';
import { Session } from '../../utils/session';

export class UploaderService {

  public ng2Uploader: FileUploader;

  private serverDomain: string;

  constructor(
    private _httpRequest: HttpClient,
    private _config: ConfigService,
    private _notifications: DefaultNotificationService,
    private _uploaderMaterials: IUploaderMaterials) {
    this.serverDomain = _config.data.URL.BE_SERVER;
    if (_uploaderMaterials.serverDomain) {
      this.serverDomain = _uploaderMaterials.serverDomain;
    }

    this.ng2Uploader = new FileUploader({url: _uploaderMaterials.api, authToken: Session.getUserToken()});
  }

  public addParam(param: string) {
    this.ng2Uploader.setOptions({url: this._uploaderMaterials.api + '?' + param, authToken: Session.getUserToken()});
  }

  public uploadFirstSelected(body?: any) {
    if (this.ng2Uploader.queue.length > 0) {
      this.ng2Uploader.onBuildItemForm = (item, form) => {
        form.append('body', body);
      };

      this.ng2Uploader.onSuccessItem = (item, response, status, headers) => {
        let serverResponse = Responses.transform(JSON.parse(response));

        if (status === 200) {
          this._notifications.success(serverResponse);
        } else {
          this._notifications.error(serverResponse);
        }

        this.clear();
      };

      this.ng2Uploader.queue[0].upload();
    } else {
      this._notifications.errorWithMessage('No File Uploaded..');
    }
  }

  public clear() {
    this.ng2Uploader.clearQueue();
  }
}
