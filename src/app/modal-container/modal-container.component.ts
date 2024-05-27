import { AfterViewInit, Component, inject, Injectable, Injector, Provider, signal, TemplateRef, Type, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IShowComp {
	component: Type<any>;
	injector: Injector;
	inputs?: Record<string, any>;
}

@Injectable()
export class ToastService {
	public readonly modals$ = new BehaviorSubject<(TemplateRef<any> | string)[]>([]);
	public readonly components = signal<IShowComp[]>([])
	private _modals = new Map();
	private _components = new Map<string, IShowComp>();

	constructor() {
	}

	public show(template: TemplateRef<any> | string, time: number = 5000) {
		const id = Math.random().toString(36).substring(7);
		this._modals.set(id, template);
		this.modals$.next([...this._modals.values()])
		setTimeout(() => {
			this._modals.delete(id);
			this.modals$.next([...this._modals.values()])
		}, time)
	}

	public showComponent(component: Type<any>, injector: Injector, inputs?: Record<string, any>): Observable<void> {
		return new Observable<void>(sub => {
			const id = Math.random().toString(36).substring(7);
			this._components.set(id, { component, injector, inputs });
			this.components.set([...this._components.values()]);
			sub.next()

			return () => {
				this._components.delete(id);
				this.components.set([...this._components.values()]);
			}
		})
	}
}


@Component({
	selector: 'app-modal-container',
	templateUrl: './modal-container.component.html',
	styleUrl: './modal-container.component.scss',
	providers: [
		ToastService
	]
})
export class ModalContainerComponent {
	service = inject(ToastService);

	public getType(sh: TemplateRef<any> | string) {
		return typeof sh === 'string' ? 'string' : 'template';
	}
}
