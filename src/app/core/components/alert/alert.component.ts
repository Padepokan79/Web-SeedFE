import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'io-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public message: any;

  constructor(private alertService: AlertService) { }

  public ngOnInit() {
      this.alertService.getMessage().subscribe((message) => { this.message = message; });
  }
}
