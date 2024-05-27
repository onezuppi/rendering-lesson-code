import { Component, inject, Input, TemplateRef } from '@angular/core';
import { STEP_DATA } from '../../directives/directives/step.diretive';

@Component({
	selector: 'app-inner',
	templateUrl: './inner.component.html',
	styleUrl: './inner.component.scss'
})
export class InnerComponent {
	public data = inject(STEP_DATA);
}
