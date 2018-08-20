import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../../../core/models/data-table';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { InputForm } from '../../../../../../core/models/input-form';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';

@Component({
  selector: 'app-tabDetail-course',
  templateUrl: './tabDetail-course.component.html',
  styleUrls: ['./tabDetail-course.component.css']
})
export class TabDetailCourseComponent implements OnInit {

  public lovDegree: LOVService;
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
        course_certificates: '',
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
        limit : 10
      },
      // searchCriteria : [
      //   { viewValue: 'Course Name', viewKey: 'course_name', type: TYPE.STRING }
      // ],
      tableColumns : [
        { prop: 'course_title', name: 'Title', width: 10, sortable: false },
        { prop: 'course_provider', name: 'Penyelenggara', width: 30, sortable: true },
        { prop: 'course_place', name: 'Tempat', width: 20, sortable: true },
        { prop: 'course_duration', name: 'Durasi', width: 20, sortable: true },
        { prop: 'course_date', name: 'Tanggal', width: 20, sortable: true },
        { prop: 'course_certificates', name: 'Sertifikat', width: 20, sortable: true }
      ]
    });

    if (this.form === 2) {
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
          { prop: 'course_title', name: 'Title', width: 10, sortable: false },
        { prop: 'course_provider', name: 'Penyelenggara', width: 30, sortable: true },
        { prop: 'course_place', name: 'Tempat', width: 20, sortable: true },
        { prop: 'course_duration', name: 'Durasi', width: 20, sortable: true },
        { prop: 'course_date', name: 'Tanggal', width: 20, sortable: true },
        { prop: 'course_certificates', name: 'Sertifikat', width: 20,
            cellTemplate: this.tableActionTemplate, sortable: false }

        ]
      });
    }
    this.action = this._factory.actions({
      api: 'sdm/course',
      dataTable: this.dataTable
    });

    this.lovDegree = this._factory.lov({
      api: 'lov/degree',
      initializeData: true
    });
  }

}
