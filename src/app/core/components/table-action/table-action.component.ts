import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { ActionService } from './../../services/uninjectable/action.service';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'io-table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent {

  @ViewChild('actionTemplate')
  public template: TemplateRef<any>;
  @Input()
  public action: ActionService;
}
