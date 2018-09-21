import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from '../../../../../core/constant/constant';
import { Session } from 'inspector';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-tab-course',
  templateUrl: './tab-course.component.html',
  styleUrls: ['./tab-course.component.scss']
})
export class TabCourseComponent implements OnInit {

  @Input()
  public form: number;
  @Input()
  public id: number;
  @Input()
  public sdmId: number;

  public sdmid: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public date: Date = new Date();
  public maxDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
  
  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = this.sdmId;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        course_id: null,
        course_title: '',
        course_provider: '',
        course_place: '',
        course_duration: '',
        course_date: '',
        course_certificates: 'Yes',
      },
      immutableFormControls: {
        sdm_id: this.sdmid,
      },
      validationMessages: {
        course_title: {
          required: 'Silahkan masukkan Nama Kursus'
        }
      }
    });

    // if (this.form === 2) {
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.sdmid.toString()),
        limit : 10
      },
      tableColumns : [
        { prop: 'norut', name: 'No', width: 30, sortable: false },
        { prop: 'course_title', name: 'Kursus', width: 30, sortable: true},
        { prop: 'course_provider', name: 'Penyelenggara', width: 30, sortable: true },
        { prop: 'course_place', name: 'Tempat', width: 30, sortable: true },
        { prop: 'course_date', name: 'Waktu', width: 30, sortable: true },
        { prop: 'course_duration', name: 'Durasi', width: 30, sortable: true },
        { prop: 'course_id', name: 'Action', width: 30,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
  // }

    this.action = this._factory.actions({
      api: 'sdm/course',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

}
