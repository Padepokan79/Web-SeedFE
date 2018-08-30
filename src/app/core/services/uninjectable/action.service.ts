import { ISimplifiedFilterOperand } from './../../interfaces/main/i-simplified-filter-operand';
import { ISimplifiedFilterComponent } from './../../interfaces/main/i-simplified-filter-component';
import { IReadAll } from './../../interfaces/param/i-read-all';
import { IAfterActionMaterials } from './../../interfaces/action/i-after-action-materials';
import { InputForm } from './../../models/input-form';
import { ConfirmDialogsComponent } from './../../components/confirm-dialogs/confirm-dialogs.component';
import { ACTION } from './../../constant/constant';
import { IIONAEngine } from './../../interfaces/main/i-iona-engine';
import { MatDialog, MatCheckboxChange } from '@angular/material';
import { ValueAdapterService } from '../adapter/value-adapter.service';
import { IFilterOperand } from '../../interfaces/main/i-filter-operand';
import { IFilterComponent } from '../../interfaces/main/i-filter-component';
import { DataTable } from '../../models/data-table';

export class ActionService {

    public buttonTitle: string;

    constructor(
        private _dialog: MatDialog,
        private _transformer: ValueAdapterService,
        private _ionaEngine: IIONAEngine
    ) {
        this.buttonTitle = 'Submit';
        this.IONA().loadDataOnTable();
    }

    get formErrors() {
        return this.form().formErrors;
    }

    public crud() {
        return this.IONA().crudService;
    }

    public form() {
        return this.IONA().inputForm;
    }

    public table() {
        return this.IONA().dataTable;
    }

    public tablePagination() {
        return this.IONA().dataTable.pagination();
    }

    public formControls() {
        return this.form().data;
    }

    public getFormData() {
        return this._transformer.transform(this.form().data.value);
    }

    public getFormControl(field: string) {
        return this.formControls().get(field);
    }

    public getFormControlValue(field: string) {
        return this.getFormControl(field).value;
    }

    public getTableData() {
        return this.table().rows;
    }

    public patchFormData(data: { [key: string]: any }) {
        this.form().data.patchValue(data);
    }

    public isFormInvalid() {
        return this.form() ? this.formControls().invalid : undefined;
    }

    public isFormPristine() {
        return this.form() ? this.formControls().pristine : undefined;
    }

    public initializeAfterAction(materials: IAfterActionMaterials) {
        this.IONA().setAfterActionMaterials(materials);
    }

    public initializeDataTable(dataTable: DataTable) {
        this.IONA().setTable(dataTable);
    }

    public initializeInputForm(inputForm: InputForm) {
        this.IONA().setForm(inputForm);
    }

    public setPaginationFilter(value: IFilterOperand | IFilterComponent | ISimplifiedFilterComponent | ISimplifiedFilterOperand, key?: string) {
        this.table()
            .pagination()
            .setFilter(value, key);
    }

    public setPaginationOrderBy(value: string) {
        this.table()
            .pagination()
            .setOrderBy(value);
    }

    public setPaginationLimit(value: number) {
        this.table()
            .pagination()
            .setLimit(value);
    }

    public setPaginationOffset(value: number) {
        this.table()
            .pagination()
            .setOffset(value);
    }

    public refreshTable(params?: { [key: string]: any }) {
        this.setPaginationOffset(0);
        this.IONA().loadDataOnTable(params);
    }

    public refreshButtonTitle() {
        switch (this.IONA().actionMode) {
            case ACTION.SAVE :
            case ACTION.CREATE :
            case ACTION.DELETE_CREATE :
                this.buttonTitle = 'Submit';
                break;
            case ACTION.UPDATE :
                this.buttonTitle = 'Update';
                break;
            default :
                break;
        }
    }

    public onSave() {
        this.form().deactivateImmutableState();
        let item = this.getFormData();

        if (this.form().defaultAction) {
            this.IONA().setActionMode(this.form().defaultAction);
        }

        switch (this.IONA().actionMode) {
            case ACTION.CREATE :
                this.IONA().create({item});
                break;
            case ACTION.UPDATE :
                this.IONA().update({item});
                break;
            case ACTION.DELETE_CREATE :
                this.IONA().deleteCreate({item});
                break;
            default :
                break;
        }
    }

    public onAdd() {
        this.form().deactivateImmutableState();
    }

    public onEdit(editedData: any) {
        let newData = this._transformer.transform(editedData);

        this.formControls().patchValue(newData);
        this.form().activateImmutableState();
        this.IONA().setActionMode(ACTION.UPDATE);
        this.refreshButtonTitle();
    }

    public onDelete(deletedData: any, deleteMessage: string = 'Are you sure to delete?') {
        this._dialog
            .open(ConfirmDialogsComponent, {
                data: {
                    selectedData: deletedData,
                    message: deleteMessage
                }
            })
            .afterClosed()
            .subscribe((data: any) => {
                if (data) {
                    this.IONA().delete({ item: deletedData });
                    this.refreshButtonTitle();
                }
            });
    }

    public onReset(forceResetAll: boolean = false) {
        this.IONA().reset(forceResetAll);
        this.refreshButtonTitle();
    }

    public onSearch(event?) {
        if (event) {
            if (event.keyCode === 13) {
                this.IONA().searchDataOnTable();
            }
        } else {
            this.IONA().searchDataOnTable();
        }
    }

    public onSort(event) {
        const sortedField = event.sorts[0];

        this.IONA().sortDataOnTable({
            property: sortedField.prop,
            direction: sortedField.dir
        });
    }

    public onLoad(event) {
        this.setPaginationOffset(event.offset);
        this.IONA().loadDataOnTable();
    }

    public onChangePageSize(size) {
        this.setPaginationOffset(0);
        this.setPaginationLimit(size);
        this.IONA().loadDataOnTable();
    }

    public cancel() {
    }

    public viewDetail() {
    }

    public adjustValue(event: any) {
        if (event instanceof MatCheckboxChange) {
            let field = event.source.name;
            let value = event.checked ? 1 : 0;
            this.getFormControl(field).setValue(value);
        }
    }

    private IONA() {
        return this._ionaEngine;
    }
}
