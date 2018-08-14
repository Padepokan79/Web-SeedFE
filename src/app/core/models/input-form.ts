import { IDTOModel } from './../interfaces/main/i-dto-model';
import { IInputFormMaterials } from './../interfaces/input-form/i-input-form-materials';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

export class InputForm {

  public data: FormGroup;

  public formDefaultValues: any;
  public formControls: any;
  public formErrors: any;
  public validationMessages: any;
  public immutableData: any;
  public isNewData: boolean;
  public resetFormAfterAction: boolean;
  public defaultAction: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _inputFormMaterials?: IInputFormMaterials
  ) {
    // this.data = this._formBuilder.group({});
    this.formDefaultValues = {};
    this.formControls = {};
    this.formErrors = {};
    this.validationMessages = {};
    this.immutableData = {};
    this.isNewData = true;
    this.resetFormAfterAction = true;

    if (_inputFormMaterials) {
      if (_inputFormMaterials.model) {
        this.initModel(new _inputFormMaterials.model());
      }

      if (_inputFormMaterials.formControls) {
        this.initFormControls(_inputFormMaterials.formControls);
      }

      if (_inputFormMaterials.immutableFormControls) {
        this.initImmutableDefaultValues(_inputFormMaterials.immutableFormControls);
      }

      // if (_inputFormParam.formErrors) {
      //   this.initFormErrors(_inputFormParam.formErrors);
      // }

      if (_inputFormMaterials.validationMessages) {
        this.initValidationMessages(_inputFormMaterials.validationMessages);
      }

      if (_inputFormMaterials.isNewData != null && !_inputFormMaterials.isNewData) {
        this.isNewData = false;
      }

      if (_inputFormMaterials.defaultAction) {
        this.defaultAction = _inputFormMaterials.defaultAction;
      }

      if (_inputFormMaterials.resetFormAfterAction != null && !_inputFormMaterials.resetFormAfterAction) {
        this.resetFormAfterAction = false;
      }
    }
  }

  public buildForm() {
    this.data = this._formBuilder.group(this.formControls);
    this.data
        .valueChanges
        .subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.data) { return; }
    const form = this.data;

    for (const field in this.formControls) {
      if (this.formControls.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  public getFormArray(formArrayName: string): FormArray {
    return this.data.get(formArrayName) as FormArray;
  }

  public setFormArray(formArrayName: string, arrayData: any[]) {
    const dataFormGroups = arrayData.map((data) => this._formBuilder.group(data));
    const dataFormArray = this._formBuilder.array(dataFormGroups);
    this.data.setControl(formArrayName, dataFormArray);
  }

  public initFormArray() {
    return this._formBuilder.array([]);
  }

  public initImmutableDefaultValues(source: any) {
    this.immutableData = source;

    for (const field in this.formControls) {
      if (this.formControls.hasOwnProperty(field)) {
        this.formDefaultValues[field] = null;
      }
    }

    if (source) {
      for (const immutableField in source) {
        if (source.hasOwnProperty(immutableField)) {
          this.formControls[immutableField] = source[immutableField];
          this.formDefaultValues[immutableField] = source[immutableField];
        }
      }
    }

    // }
    // else {
    //   for (const field in this.formControls) {
    //     if (this.formControls.hasOwnProperty(field)) {
    //       // source: Object of Form Controls
    //       if (source[field] instanceof Array) {
    //         this.formImmutableData[field] = this.formControls[field][0];
    //       } else {
    //         this.formImmutableData[field] = this.formControls[field];
    //       }
    //     }
    //   }
    // }
  }

  public initModel(model: IDTOModel) {
    this.formControls = model.attributes();
    this.validationMessages = model.validationMessages();
  }

  public initFormControls(formControls: object) {
    if (formControls) {
      formControls['Model_ID'] = '';

      if (this.formControls) {
        for (const field in formControls) {
          if (formControls.hasOwnProperty(field)) {
            this.formControls[field] = formControls[field];
          }
        }
      } else {
        this.formControls = formControls;
      }
    }

    // this.formControls = formControls;
  }

  public initFormErrors(formErrors?: object) {
    if (formErrors) {
      this.formErrors = formErrors;
    } else {
      for (const field in this.formControls) {
        if (this.formControls.hasOwnProperty(field)) {
          this.formErrors[field] = '';
        }
      }
    }
  }

  public initValidationMessages(validationMessages: object) {
    if (validationMessages) {
      if (this.validationMessages) {
        for (const field in validationMessages) {
          if (validationMessages.hasOwnProperty(field)) {
            this.validationMessages[field] = validationMessages[field];
          }
        }
      } else {
        this.validationMessages = validationMessages;
      }
    }
  }

  public activateImmutableState() {
    for (const field in this.immutableData) {
      if (this.immutableData.hasOwnProperty(field)) {
        this.data.get(field).disable();
      }
    }
  }

  public deactivateImmutableState() {
    for (const field in this.immutableData) {
      if (this.immutableData.hasOwnProperty(field)) {
        this.data.get(field).enable();
      }
    }
  }

  public resetData(forceResetAll) {
    if (forceResetAll) {
      this.data.reset();
    } else {
      this.data.reset(this.formDefaultValues);
    }
  }
}
