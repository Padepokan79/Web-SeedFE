import { IReadAll } from './../param/i-read-all';
import { ISearchKey } from '../main/i-search-key';

export interface IDataTableMaterials extends IReadAll {
    tableColumns?: any[];
    checkboxColumn?: any;
    searchCriteria?: ISearchKey[];
    serverSide?: boolean;
    forceReloadAfterAction?: boolean;
}
