import { Directive, EmbeddedViewRef, InjectionToken, Injector, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { StepManagerService } from './step-manager.directive';

export const StepData = new InjectionToken('data')

@Directive({
	selector: 'ng-template[step]'
})
export class StepDirective<T> implements OnInit {
	@Input({ required: true })
	public step!: any;

//	public data!: T;

	private _view: EmbeddedViewRef<void> | null = null

	constructor(
		private readonly template: TemplateRef<any>,
		private readonly injector: Injector,
		private readonly viewContainerRef: ViewContainerRef,
		private readonly service: StepManagerService<any>
	) {
	}

	ngOnInit(): void {

    }

	public destroy(): void {
		this._view?.destroy();
	}

	public render(data: T): void {
		this._view = this.viewContainerRef.createEmbeddedView(this.template, {}, {
			injector: Injector.create({
				parent: this.injector,
				providers: [{
					provide: StepData,
					useValue: data
				}]
			})
		});
	}
}
