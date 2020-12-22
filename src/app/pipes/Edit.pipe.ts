import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'editsummary'
})

export class EditPipe implements PipeTransform{
    transform(value: string, args?: any)
    {
        if(!value)
        return null;

        if(value.length>200)
        {
            return value.substr(0,90)+' ... ';
        }

        return value;

        
    }
}