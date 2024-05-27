import { Component, Injector, Provider, TemplateRef, Type, ViewChild } from '@angular/core';
import { InnerComponent } from '../inner/inner.component';
import { Inner2Component } from '../inner2/inner2.component';
import { Inner3Component } from '../inner3/inner3.component';
import { StepManagerService } from '../../directives/step-manager.directive';
import { filter, map } from 'rxjs';
import { StepData } from '../../directives/step.directive';
import { ToastService } from '../../modal-container/modal-container.component';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss',
	providers: [
		StepManagerService,
		{
			provide: StepData,
			useValue: { 'def': 123 }
		}
	]
})
export class MainComponent {
//	public components: Type<any>[] = [
//		InnerComponent,
//		Inner2Component,
//		Inner3Component
//	]

//  	@ViewChild('closed', { read: TemplateRef, static: true })
//	public readonly closedTemplate: TemplateRef<any> | null = null;
//
	public isOpen = false;
//
//	public toggle(): void {
//
//	}

	@ViewChild('adInpt')
	public readonly adInpt: TemplateRef<any> | null = null;

	constructor(
		public readonly stepService: StepManagerService<{ 1 : string, 2 : string, 3: boolean }>,
		public readonly toast: ToastService,
		public readonly injector: Injector
	) {
	}

	public show(): void {
		const sub = this.toast.showComponent(InnerComponent, this.injector, { innerTemplate:  this.adInpt }).subscribe();
		setTimeout(() => sub.unsubscribe(), 1500)
	}

	public changeStep1(): void {
		this.stepService.changeStep(1, 'hello _ mne')
	}

	public changeStep2(): void {
		this.stepService.changeStep(2, 'ad')
	}

	public changeStep3(): void {
		this.stepService.changeStep(3, false)
	}
}
