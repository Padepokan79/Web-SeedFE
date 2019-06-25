import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../../core/services/uninjectable/action.service';
import { CoreFactory } from '../../../core/factory/core.factory';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public action: ActionService;
  public view: any[];
  public pieChartData: any  = [];

  // lov
  public lovTahun: any = [];
  public lovChartDataType = [
    {key: 1, value: 'Summary Talent On Site'},
    {key: 2, value: 'Summary Talent On Test'},
    {key: 3, value: 'Summary Talent Passed Test'},
    {key: 4, value: 'Summary Talent Failed Test'},
    {key: 5, value: 'Summary Talent By Hire State'},
  ];
  public lovChartType = [
    // { key : 'bar-vertical', value : 'Vertical Bar Chart' },
    // { key : 'bar-horizontal', value : 'Horizontal Bar Chart' },
    // { key : 'bar-vertical-2d', value : 'Grouped Vertical Bar Chart' },
    // { key : 'bar-horizontal-2d', value : 'Grouped Horizontal Bar Chart' },
    { key : 'bar-vertical-2d', value : 'Vertical Bar Chart' },
    { key : 'bar-horizontal-2d', value : 'Horizontal Bar Chart' },
    { key : 'bar-vertical-stacked', value : 'Stacked Vertical Bar Chart' },
    { key : 'bar-horizontal-stacked', value : 'Stacked Horizontal Bar Chart' },
    { key : 'bar-vertical-normalized', value : 'Normalized Vertical Bar Chart' },
    { key : 'bar-horizontal-normalized', value : 'Normalized Horizontal Bar Chart' },
    { key : 'pie-chart', value : 'Pie Chart' },
    // { key : 'advanced-pie-chart', value : 'Advanced Pie Chart' },
    // { key : 'pie-grid', value : 'Pie Grid' },
    { key : 'line-chart', value : 'Line Chart' },
    { key : 'polar-chart', value : 'Polar Chart' },
    { key : 'area-chart', value : 'Area Chart' },
    { key : 'area-chart-stacked', value : 'Stacked Area Chart' },
    { key : 'area-chart-normalized', value : 'Normalized Area Chart' }
  ];

  // ngModel
  public tahun: any = new Date().getUTCFullYear();
  public chartDataType: any = 1;
  public chartType: any = 'pie-chart';
  public hireState: any = '1';

  // chart properties
  public showLegend = true;
  public legendTitle = 'Legend';
  public gradient = false;
  public tooltipDisabled = false;
  public animations: boolean = true;

  // pie
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public arcWidth = 0.50;

  constructor(
    public _factory: CoreFactory,
    private http: HttpClient) {

  }

  public ngOnInit() {
    // tslint:disable-next-line:prefer-const

    this.http.get(this._factory.api({api: 'sdm/mengelolaHistoriSdm/cekStatusSdm'})).subscribe((res: any) => {
      console.log(res);
    });
    this.http.get(this._factory.api({api: 'project/sdmAssignment/cekDataAssign'})).subscribe((res: any) => {
      console.log(res);
    });

    this.lovTahun = this._factory.lov({
      api: 'lov/SystemMasterTahun',
      initializeData: true
    });

    this.onSubmit();
  }

  public pieTooltipText({data}) {
    const label = data.name;
    const value = data.value;
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${value}</span>
    `;
  }

  public onSubmit() {
    const pieChartDataApi = this._factory.api({
      api: 'report/DashboardChart/getData',
      params: {
        tahun: this.tahun,
        chartDataType: this.chartDataType
      }
    });

    this._factory.http()
    .get(pieChartDataApi)
    .subscribe((res: any) => {
      this.pieChartData = res.data;
    });
  }
}
