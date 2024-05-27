import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InnerComponent } from './components/inner/inner.component';
import { Inner2Component } from './components/inner2/inner2.component';
import { Inner3Component } from './components/inner3/inner3.component';
import { MyIfDirective } from './directives/my-if.directive';
import { StepDiretive, StepDiretiveManager } from './directives/directives/step.diretive';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		InnerComponent,
		Inner2Component,
		Inner3Component,
		MyIfDirective,
		StepDiretive,
		StepDiretiveManager
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
