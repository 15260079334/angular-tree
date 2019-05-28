import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EasyUIModule } from 'ng-easyui/components/easyui/easyui.module';
import { HttpClientModule } from '@angular/common/http';
import { DatesPipe } from './dates.pipe';
import { FilterDataPipe } from './filter-data.pipe';


@NgModule({
	declarations: [
		AppComponent,
		DatesPipe,
		FilterDataPipe
	],	
	imports: [
		BrowserModule,
		AppRoutingModule,
		EasyUIModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [DatesPipe, FilterDataPipe]
})
export class AppModule { }
