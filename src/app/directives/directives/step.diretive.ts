import { AfterViewInit, ContentChildren, Directive, Injectable, InjectionToken, Injector, Input, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const STEP_DATA = new InjectionToken('STEP_DATA', {
	factory: () => 1337
});


type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T];

@Injectable()
export class StepManagerService<T extends Record<string, any>> {
	public readonly step$ = new BehaviorSubject<Entries<T> | null>(null);


	changeStep<K extends keyof T, V extends T[K]>(step: K, value: V): void {
		this.step$.next([step, value]);
	}
}

@Directive({
	selector: '[step]'
})
export class StepDiretive {
	@Input({ required: true })
	public step!: string;

	constructor(
		private readonly template: TemplateRef<any>,
		private readonly viewContainerRef: ViewContainerRef,
	) {
	}

	public render<T>(data: T): void {
		this.viewContainerRef.createEmbeddedView(this.template, undefined, {
			injector: Injector.create({
				parent: this.viewContainerRef.injector,
				providers: [{
					provide: STEP_DATA,
					useValue: data
				}]
			})
		});
	}
}

@Directive({
	selector: '[stepManager]'
})
export class StepDiretiveManager {
	@ContentChildren(StepDiretive)
	public steps!: QueryList<StepDiretive>;


	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly service: StepManagerService<any>
	) {
		service.step$
			.subscribe(s => {
				const [name, value] = s || [];

				viewContainerRef.clear();
				this.steps?.forEach(d => {
					if (d.step === name?.toString()) {
						d.render(value);
					}
				});
			})
	}
}

