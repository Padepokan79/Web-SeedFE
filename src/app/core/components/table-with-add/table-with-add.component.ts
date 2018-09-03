import { TableActionComponent } from './../table-action/table-action.component';
import { ActionService } from './../../services/uninjectable/action.service';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { Component, OnInit, Input, ViewChild, DoCheck, TemplateRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'io-table-with-add',
  templateUrl: './table-with-add.component.html',
  styleUrls: ['./table-with-add.component.scss']
})
export class TableWithAddComponent implements OnInit {

  showBtn: boolean = true;

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: TableActionComponent;
  @ViewChild('ngxTable')
  public ngxTable: DatatableComponent;
  @Input()
  public action: ActionService;

  constructor() {
    // Do Something
  }

  public ngOnInit() {
    if (this.action && this.action.table() && this.action.table().columns) {
      let actionExist = this.action.table().columns.find((column) => column.name === 'Action');

      // if (!actionExist) {
      //   this.action.dataTable.columns.push(
      //     {
      //       cellTemplate: this.tableActionTemplate.template,
      //       prop: 'id',
      //       name: 'Action',
      //       width: 100,
      //       sortable: false
      //     }
      //   );
      // }
    }
  }
}
