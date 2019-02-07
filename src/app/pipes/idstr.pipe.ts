import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'idstr'
})
export class IdstrPipe implements PipeTransform {

    transform(id: number): string {
        return '@' + id.toString().padStart(4, '0');
    }

}
