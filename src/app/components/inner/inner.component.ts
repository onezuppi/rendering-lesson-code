import { Component, inject, Input, TemplateRef } from '@angular/core';
import { StepData, StepDirective } from '../../directives/step.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'app-inner',
	templateUrl: './inner.component.html',
	styleUrl: './inner.component.scss'
})
export class InnerComponent {
	@Input()
	public innerTemplate!: TemplateRef<any>;

	public readonly data = inject(StepData)

	constructor(
//		public readonly data: StepDirective<string>
	) {
//		console.log(this.data)
	}
}
