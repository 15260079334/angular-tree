import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

	transform(value: any, args1?: any,args2?: any): any {
		
		if(!args2){
			return value
		}else{
			return value.filter(val => val[args1] ? (val[args1].indexOf(args2) > -1): false)
		}
	}
}
