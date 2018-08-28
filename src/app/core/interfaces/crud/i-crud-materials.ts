import { IUrl } from './../main/i-url';
import { ICustomUrl } from '../main/i-custom-url';

export interface ICRUDMaterials extends IUrl {
    customUrl?: ICustomUrl;
}
