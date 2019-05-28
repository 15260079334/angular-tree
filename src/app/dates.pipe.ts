import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dates'
})
export class DatesPipe implements PipeTransform {
	
	transform(value: any, args?: any): any {
		let times: any, y: any, m: any, d: any, h: any, f: any, s: any, str: any;
		times = new Date(value);
		y = times.getFullYear();
		m = times.getMonth();
		d = times.getDate();
		h = times.getHours();
		f = times.getMinutes();
		s = times.getSeconds();
		m = m + 1 < 10 ? '0' + (m + 1) : m + 1;
		d = d < 10 ? '0' + d : d;
		h = h < 10 ? '0' + h : h;
		f = f < 10 ? '0' + f : f;
		s = s < 10 ? '0' + s : s;
		switch (args) {
			case 'D':
				str = `${y}-${m}-${d}`;
				break;
			case 'S':
				str = `${y}-${m}-${d} ${h}:${f}:${s}`;
				break;
			default:
				str = `${y}-${m}-${d}`;
				break;
		}
		return str;
	}

}
