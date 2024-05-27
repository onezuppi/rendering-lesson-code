import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[myIf]'
})
export class MyIfDirective {
	@Input()
	public set myIf(value: boolean) {
		this.render(value);
	}

	@Input()
	public set myIfElse(value: TemplateRef<any>) {
		this._elseTemplate = value;
		this.render(false);
	}

	private _elseTemplate: TemplateRef<any> | null = null;


	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {
	}

	private render(value: boolean) {
		this.viewContainer.clear();
		if (value) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		} else {
			this._elseTemplate && this.viewContainer.createEmbeddedView(this._elseTemplate,
				{ $implicit: 1 });
		}
	}
}
