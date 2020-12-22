import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'articlesummary', 
    pure: false
})

export class ArticlePipe implements PipeTransform{
    transform(value: string, args?: any)
    {
        if(!value)
        return null;

        if(value.length>300)
        {
            return value.substr(0,160)+' ... ';
        }

        return value;

        
    }
}