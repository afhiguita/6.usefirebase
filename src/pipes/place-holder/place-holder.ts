import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {

  transform(value: string, defautlText:string = "Sin titulo") {
    return ( value ) ? value : defautlText;
  }
}
