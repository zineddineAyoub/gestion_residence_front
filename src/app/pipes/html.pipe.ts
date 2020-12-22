import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'html',
  pure: true
})
export class HtmlPipe implements PipeTransform {
  constructor(private sanitizer?:DomSanitizer){};
  

  transform(value: string, args?: any)
    {
      return this.sanitizer.bypassSecurityTrustHtml(value);
        
    }

}
