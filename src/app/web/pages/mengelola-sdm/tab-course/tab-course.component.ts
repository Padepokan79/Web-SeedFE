import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';

@Component({
  selector: 'sdm-tab-course',
  templateUrl: './tab-course.component.html',
  styleUrls: ['./tab-course.component.scss']
})
export class TabCourseComponent implements OnInit {

  @Input()
  public form: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: 113,
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

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 5
      },
      tableColumns : [
        { prop: 'no_urut', name: 'No', width: 10, sortable: false },
        { prop: 'course_title', name: 'Nama Kursus', width: 30, sortable: true },
        { prop: 'course_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }

      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/course',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }
}
