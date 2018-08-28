import {Component} from '@angular/core';
import { BaMsgCenterService } from '../../../services/admin/baMsgCenter.service';


@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  public notifications: Object[];
  public messages: Object[];

  constructor(private _baMsgCenterService: BaMsgCenterService) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }

}
