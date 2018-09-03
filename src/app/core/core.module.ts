import { ApiAdapterService } from './services/adapter/api-adapter.service';
import { ValueAdapterService } from './services/adapter/value-adapter.service';
import { ConfirmDialogsComponent } from './components/confirm-dialogs/confirm-dialogs.component';
import { BaMenuUserInformationComponent } from './components/admin/baMenu/components/baMenuUserInformation/baMenuUserInformation.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { ViewAsDateComponent } from './templates/view-as-date/view-as-date.component';
import { TableActionComponent } from './components/table-action/table-action.component';
import { FormActionComponent } from './components/form-action/form-action.component';
// import { CoreConfigModule } from './core.config.module';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import {
//   MatInputModule,
//   MatOptionModule,
//   MatSelectModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
//   MatProgressBarModule,
//   MatButtonModule,
//   MatChipsModule,
//   MatAutocompleteModule,
//   MatCardModule,
//   MatDialogModule
// } from '@angular/material';
// import { SimpleNotificationsModule } from 'angular2-notifications';
// import { MatTooltipModule } from '@angular/material';
import { ThemeConfigProvider } from './core.theme.config.providers';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ThemeConfig } from './core.theme.config';
import { CoreFactory } from './factory/core.factory';
import { ActionComponent } from './components/action/action.component';
import { AlertComponent } from './components/alert/alert.component';
import { FormComponent } from './components/form/form.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { TableWithAddComponent } from './components/table-with-add/table-with-add.component';
import { BaContentTop } from './components/admin/baContentTop/baContentTop.component';
import { BaMenu } from './components/admin/baMenu/baMenu.component';
import { BaMenuItem } from './components/admin/baMenu/components/baMenuItem/baMenuItem.component';
import { BaPageTop } from './components/admin/baPageTop/baPageTop.component';
import { BaSidebar } from './components/admin/baSidebar/baSidebar.component';
import { BaSidebarTop } from './components/admin/baSidebarTop/baSidebarTop.component';
import { BaBackTop } from './components/admin/baBackTop/baBackTop.component';
import { BaMsgCenter } from './components/admin/baMsgCenter/baMsgCenter.component';
import { BaScrollPosition } from './directives/admin/baScrollPosition.directive';
import { BaSlimScroll } from './directives/admin/baSlimScroll.directive';
import { EmailValidator } from './validators/email.validator';
import { EqualPasswordsValidator } from './validators/equal-passwords.validator';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { BaMenuService } from './services/admin/baMenu.service';
import { BaMsgCenterService } from './services/admin/baMsgCenter.service';
import { SdwModalComponent } from './components/sdw-modal/sdw-modal.component';
import { SdwModalLgComponent } from './components/sdw-modal-lg/sdw-modal-lg.component';
import { SdwModalSmComponent } from './components/sdw-modal-sm/sdw-modal-sm.component';
import { ModalDangerComponent } from './components/modal-danger/modal-danger.component';
import { Form2Component } from './components/form2/form2.component';
import { ValuesTransformerService } from './services/values-transformer.service';
import { FilterAdapterService } from './services/adapter/filter-adapter.service';
import { DefaultNotificationService } from './services/default-notification.service';
// import { GLOBAL_MODULE_PROVIDERS } from 'app/app.providers';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CoreConfigModule } from 'app/core/core.config.module';
import { IOProfilePicturePipe } from './pipes/admin/io-profile-picture.pipe';

const CORE_COMPONENTS = [
    ActionComponent,
    AlertComponent,
    FormComponent,
    Form2Component,
    FormActionComponent,
    ModalComponent,
    TableComponent,
    TableWithAddComponent,
    TableActionComponent,
    InputValidationComponent,
    BaMenuUserInformationComponent,
    ModalDangerComponent,
    SdwModalComponent,
    SdwModalLgComponent,
    SdwModalSmComponent,
    ConfirmDialogsComponent,
    ViewAsDateComponent,
    BaContentTop,
    BaMenu,
    BaMenuItem,
    BaPageTop,
    BaSidebar,
    BaSidebarTop,
    BaBackTop,
    BaMsgCenter
];

const CORE_DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll
];

const CORE_PIPES = [
    IOProfilePicturePipe
];

const CORE_VALIDATORS = [
    EmailValidator,
    EqualPasswordsValidator
];

const CORE_SERVICES = [
    AuthGuard,
    AlertService,
    AuthService,
    ConfigService,
    BaMenuService,
    BaMsgCenterService,
    ApiAdapterService,
    FilterAdapterService,
    ValueAdapterService,
    DefaultNotificationService,
    CoreFactory
];

@NgModule({
  imports: [
    CoreConfigModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule,
    NgxDatatableModule,
    NgxChartsModule,
    CurrencyMaskModule,
    FileUploadModule,
    SimpleNotificationsModule.forRoot()
    // ...GLOBAL_MODULE_PROVIDERS,
    // MatInputModule,
    // MatOptionModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatProgressBarModule,
    // MatButtonModule,
    // MatChipsModule,
    // MatAutocompleteModule,
    // MatCardModule,
    // MatDialogModule,
    // MatTooltipModule,
    // CommonModule,
    // RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgxDatatableModule,
    // SimpleNotificationsModule.forRoot(),
    // CoreConfigModule
  ],
  exports: [
    ...CORE_COMPONENTS,
    ...CORE_DIRECTIVES,
    ...CORE_PIPES
  ],
  declarations: [
    ...CORE_COMPONENTS,
    ...CORE_DIRECTIVES,
    ...CORE_PIPES
  ],
  entryComponents: [
    ConfirmDialogsComponent,
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ThemeConfigProvider,
        ThemeConfig,
        ...CORE_VALIDATORS,
        ...CORE_SERVICES
      ],
    } as ModuleWithProviders;
  }
}
