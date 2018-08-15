import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../../../core/models/data-table';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from '../../../../../../core/constant/constant';
import { InputForm } from '../../../../../../core/models/input-form';

@Component({
  selector: 'app-tabDetail-course',
  templateUrl: './tabDetail-course.component.html',
  styleUrls: ['./tabDetail-course.component.css']
})
export class TabDetailCourseComponent implements OnInit {

  public inputForm: InputForm;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @Input()
  public form: number;
  @Input()
  public id: number;
  public sdmid: number;

  public action: ActionService;
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
