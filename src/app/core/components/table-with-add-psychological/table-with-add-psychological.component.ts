import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TableActionComponent } from '../table-action/table-action.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActionService } from '../../services/uninjectable/action.service';

@Component({
  selector: 'io-table-with-add-psychological',
  templateUrl: './table-with-add-psychological.component.html',
  styleUrls: ['./table-with-add-psychological.component.scss']
})
export class TableWithAddPsychologicalComponent implements OnInit {

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
