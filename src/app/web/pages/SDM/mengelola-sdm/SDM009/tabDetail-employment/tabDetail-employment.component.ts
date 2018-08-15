import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../../core/constant/constant';

@Component({
  selector: 'app-tabDetail-employment',
  templateUrl: './tabDetail-employment.component.html',
  styleUrls: ['./tabDetail-employment.component.css']
})
export class TabDetailEmploymentComponent implements OnInit {

  @Input()
  public form: number;
  @Input()
  public id: number;

  public sdmid: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {
    if (this.form === 1) {
      this.sdmid = 113;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        course_id: 0,
        sdm_id: this.sdmid,
        course_title: '',
        course_provider: '',
        course_place: '',
        course_duration: '',
        course_date: '',
        course_certificates: 'Yes',
      },
      validationMessages: {
        course_title: {
          required: 'Silahkan masukkan Nama Kursus'
        }
      }
    });

    if (this.form === 3) {
      this.dataTable = this._factory.dataTable({
        serverSide : true,
        pagingParams : {
          filter: {
            field: 'sdm_id',
            operator: COMPARISON_OPERATOR.EQ,
            value: this.id
          },
          limit : 5
        },
        tableColumns : [
          { prop: 'course_id', name: 'Course ID', width: 10, sortable: false },
          { prop: 'course_title', name: 'Nama Kursus', width: 30, sortable: true },
          { prop: 'course_id', name: 'Action', width: 20,
            cellTemplate: this.tableActionTemplate, sortable: false }

        ]
      });
    }
    this.action = this._factory.actions({
      api: 'sdm/course',
      dataTable: this.dataTable
    });
  }

}
