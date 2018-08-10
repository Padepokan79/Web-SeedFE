import { ActionService } from './../../services/uninjectable/action.service';
import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'io-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent {

  @Input()
  public action: ActionService;
  @Input()
  public errorField: any;
  // public errorMessage: string;

  // public ngDoCheck() {
  //   console.log(JSON.stringify(this.action.inputForm.formControls));
  //   console.log(this.errorField);

  //   if (this.action.inputForm.formErrors && this.errorField) {
  //     this.errorMessage = this.action.inputForm.formErrors[this.errorField];
  //   }
  // }
}
