import { Component, OnInit, ViewChild } from '@angular/core';
import { InputForm } from '../../../core/models/input-form';
import { DataTable } from '../../../core/models/data-table';
import { ActionService } from '../../../core/services/uninjectable/action.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  
  constructor() { }

  ngOnInit() {
  }

}
