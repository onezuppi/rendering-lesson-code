import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MyIfDirective } from './directives/my-if.directive';
import { InnerComponent } from './components/inner/inner.component';
import { Inner2Component } from './components/inner2/inner2.component';
import { Inner3Component } from './components/inner3/inner3.component';
import { StepDirective } from './directives/step.directive';
import { StepManagerDirective } from './directives/step-manager.directive';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		MyIfDirective,
		InnerComponent,
		Inner2Component,
		Inner3Component,
		StepDirective,
		StepManagerDirective,
  ModalContainerComponent
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
