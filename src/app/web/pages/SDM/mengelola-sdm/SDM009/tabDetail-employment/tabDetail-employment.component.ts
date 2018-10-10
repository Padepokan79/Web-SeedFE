import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { Comparison } from '../../../../../../core/enums/comparison-operator.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tabDetail-employment',
  templateUrl: './tabDetail-employment.component.html',
  styleUrls: ['./tabDetail-employment.component.scss']
})
export class TabDetailEmploymentComponent implements OnInit {

  public selected = 0;
  public disabled = true;
  public disabled1 = false;
  public sdmterbesar = 0;

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

  public lovEmployment: LOVService;
  private selectedId: any;

  constructor(private _factory: CoreFactory,
              private route: ActivatedRoute,
              private location: Location) {
      this.route.params.subscribe((param) => {
        this.selectedId = param.id;
        console.log(this.selectedId);
      });
    }

  public ngOnInit() {
    if (this.form === 1) {
      this.sdmid = 113;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        employment_id: 0,
        sdm_id: this.sdmid,
        employment_corpname: '',
        employment_startdate: '',
        employment_enddate: '',
        employment_rolejob: '',
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
      //   { viewValue: 'Corp Name', viewKey: 'employment_corpname', type: TYPE.STRING}
      // ],
      tableColumns : [
        { prop: 'employment_corpname', name: 'Nama Perusahaan', flexGrow: 6, sortable: false },
        { prop: 'employment_startdate', name: 'Tanggal masuk', flexGrow: 2, sortable: false },
        { prop: 'employment_enddate', name: 'Tanggal keluar', flexGrow: 2, sortable: false },
        { prop: 'employment_rolejob', name: 'Jabatan', flexGrow: 3, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/employment',
      dataTable: this.dataTable
    });

    this.lovEmployment = this._factory.lov({
      api: 'lov/degree',
      initializeData: true
    });
  }
  public goBack() {
      this.location.back();
    }
}
