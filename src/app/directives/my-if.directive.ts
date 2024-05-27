import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	'selector': '[myIf]'
})
export class MyIfDirective {
	private hasView = false;
	private elseTemplateRef: TemplateRef<any> | null = null;

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	@Input()
	set myIf(condition: boolean) {
		this.updateView(condition);
	}

	@Input()
	set myIfTop(templateRef: TemplateRef<any> | null) {
		this.elseTemplateRef = templateRef;
		this.updateView(this.hasView);
	}

	private updateView(condition: boolean) {
		if (condition) {
			if (!this.hasView) {
					this.viewContainer.clear();
					this.viewContainer.createEmbeddedView(this.templateRef);
					this.hasView = true;
			}
		} else {
			if (this.hasView) {
				this.viewContainer.clear();
				this.hasView = false;
			}
			if (this.elseTemplateRef) {
				this.viewContainer.createEmbeddedView(this.elseTemplateRef);
			}
		}
	}
}
