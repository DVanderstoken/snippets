import { Injectable } from '@angular/core';

import { Commune } from './commune';
import { COMMUNES } from './mock-communes';

@Injectable()
export class CommuneService {
    public getCommunes(): Commune[] {
        return COMMUNES;
    }
}
