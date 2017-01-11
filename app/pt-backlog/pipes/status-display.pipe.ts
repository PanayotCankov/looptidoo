//angular imports
import { Pipe, PipeTransform } from '@angular/core';


//app imports
import { StatusEnum } from '../../shared/static-data';

@Pipe({ name: 'statusDisplay' })
export class StatusDisplayPipe implements PipeTransform {
    transform(value: StatusEnum): string {
        return StatusEnum[value];
    }
}