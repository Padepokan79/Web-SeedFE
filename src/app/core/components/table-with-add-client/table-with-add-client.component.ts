import { OnInit, ViewChild, Input, Component } from '@angular/core';
import { ActionService } from '../../services/uninjectable/action.service';
import { DatatableComponent } from '../../../../../node_modules/@swimlane/ngx-datatable';
import { TableActionComponent } from '../table-action/table-action.component';

@Component({
  selector: 'io-table-with-add-client',
  templateUrl: './table-with-add-client.component.html',
  styleUrls: ['./table-with-add-client.component.css']
})
export class TableWithAddClientComponent implements OnInit {

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
