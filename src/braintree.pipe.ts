import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'braintreePipe'
})
@Injectable()
export class BraintreePipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    return value;
  }
}
