import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { InnerComponent } from '../inner/inner.component';
import { Inner2Component } from '../inner2/inner2.component';
import { Inner3Component } from '../inner3/inner3.component';
import { StepManagerService } from '../../directives/directives/step.diretive';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss',
	providers: [ StepManagerService ]
})
export class MainComponent {
	public component = InnerComponent;

	public isOpen = false;

	constructor(
		public readonly stepManagerService: StepManagerService<{1: number, 'hello': boolean }>
	) {
		this.stepManagerService.changeStep('hello', false)
	}
}
