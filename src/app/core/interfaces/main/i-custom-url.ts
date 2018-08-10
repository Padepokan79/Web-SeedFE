import { IUrl } from './i-url';

export interface ICustomUrl {
    create?: IUrl;
    readAll?: IUrl;
    readById?: IUrl;
    update?: IUrl;
    delete?: IUrl;
    deleteCreate?: IUrl;
}
