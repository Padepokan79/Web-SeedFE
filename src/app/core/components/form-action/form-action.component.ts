import { ActionService } from './../../services/uninjectable/action.service';
import { InputForm } from './../../models/input-form';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'io-form-action',
  templateUrl: './form-action.component.html',
  styleUrls: ['./form-action.component.scss']
})
export class FormActionComponent implements OnInit {
  @Input()
  public action: ActionService;
  @Input()
  public disableAction: boolean = false;
  @Output()
  public afterCreate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public afterUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public afterDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public afterReset: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    // Do Something
  }

  public ngOnInit() {
    this.action.initializeAfterAction({
      create: this.afterCreate,
      update: this.afterUpdate,
      delete: this.afterDelete,
      reset: this.afterReset
    });
  }
}
