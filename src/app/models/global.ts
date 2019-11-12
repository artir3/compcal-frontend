import { Injectable } from '@angular/core';

@Injectable()
export class Global {
    public static get allMonths() {
        return [
        { name: 'styczeń', no: 1 }, 
        { name: 'luty', no: 2 },
        { name: 'marzec', no: 3 },
        { name: 'kwiecień', no: 4 },
        { name: 'maj', no: 5 },
        { name: 'czerwiec', no: 6 },
        { name: 'lipiec', no: 7 },
        { name: 'sierpień', no: 8 },
        { name: 'wrzesień', no: 9 },
        { name: 'pańdziernik', no: 10 },
        { name: 'listopad', no: 11 },
        { name: 'grudzień', no: 12 },];
    }
}

