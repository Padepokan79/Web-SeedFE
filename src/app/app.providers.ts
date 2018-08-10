import { RouterModule } from '@angular/router';
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
import { CoreModule } from 'app/core/core.module';

// Configuration based on this site
// https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407

export const PAGES_MODULE_PROVIDERS = [
    CoreModule.forRoot(),
    CoreConfigModule,
    CommonModule,
    FormsModule,
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
];

export const GLOBAL_MODULE_PROVIDERS = [
    ...PAGES_MODULE_PROVIDERS,
    RouterModule
];
