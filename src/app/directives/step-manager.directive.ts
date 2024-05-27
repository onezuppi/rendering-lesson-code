import { AfterViewInit, ContentChildren, Directive, EmbeddedViewRef, Injectable, Injector, Input, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import { StepData, StepDirective } from './step.directive';
import { BehaviorSubject, map, pipe } from 'rxjs';

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T];

@Injectable()
export class StepManagerService<T extends Record<string, any>> {
	public readonly step$ = new BehaviorSubject<Entries<T>| null>(null);

	constructor() {
	}

	public changeStep<K extends keyof T, V extends T[K]>(step: K, value: V): void {
		this.step$.next([step, value]);
	}
}

@Directive({
	selector: '[stepsManager]'
})
export class StepManagerDirective implements AfterViewInit {
	@ContentChildren(StepDirective)
	private readonly steps!: QueryList<StepDirective<any>>;

	@Input()
	public default!: TemplateRef<any>

	private _currentStep: EmbeddedViewRef<any> | null = null;

	constructor(
		public readonly service: StepManagerService<any>,
	) {

	}

	ngAfterViewInit(): void {
		this.service.step$
			.subscribe(s => {
				this._currentStep?.destroy();
				if (s === null) {
					console.log(this.steps.find(s => s.step === null))
					this.steps.find(s => s.step === null)?.render(void 0);
					return;
				}

				this.steps?.forEach(step => {
					step.destroy();
					if (step.step === s[0].toString()) {
						step.render(s[1]);
//						step.data = s[1];
//						this._currentStep = this.viewContainerRef.createEmbeddedView(step.template, {}, {
//							injector: Injector.create({
//								parent: this.injector,
//								providers: [{
//									provide: StepData,
//									useValue: s[1]
//								}]
//							})
//						});
					}
				})
			})
    }

}
