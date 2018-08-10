import { IUrl } from './../main/i-url';
import { IReadAll } from './../param/i-read-all';

export interface ILOVMaterials extends IReadAll, IUrl {
    initializeData?: boolean;
    initializeAutoComplete?: boolean;
    autoCompleteMinLength?: number;
}
