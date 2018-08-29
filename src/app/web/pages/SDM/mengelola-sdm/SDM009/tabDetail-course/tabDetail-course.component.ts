import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../../../core/models/data-table';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { InputForm } from '../../../../../../core/models/input-form';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { Comparison } from '../../../../../../core/enums/comparison-operator.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabDetail-course',
  templateUrl: './tabDetail-course.component.html',
  styleUrls: ['./tabDetail-course.component.scss']
})
export class TabDetailCourseComponent implements OnInit {

  public selected = 0;
  public disabled = true;
  public disabled1 = false;
  public sdmterbesar = 0;

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
  private selectedId: any;

  constructor(private _factory: CoreFactory,
              private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      console.log(this.selectedId);
    });
   }

  public ngOnInit() {
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
        filter: Comparison.EQ('sdm_id', this.selectedId),
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
