/**
 * finalComponent?(no interactive child)
 * with label area
 * lock?
 * hints
 *
 * htmlbutton
 *
 * get/set function
 *
 * lock?
 *
 * hints
 */

import { PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import { MI } from '../UIMaster';
import { UIChildBase } from '../ui/SimpleBaseUI';

export default abstract class UISelectableBase extends UIChildBase {
	//================================================================

	selected: boolean = false;
	triggered: boolean = false;
	label?: string;
	hints: string = '';
	title: string = '';

	@property({ type: Boolean })
	lock: boolean = false;

	@property({ type: Boolean })
	active: boolean = false;
	@property({ type: Function })
	callback?: ((t?: CustomEvent) => void) | undefined;

	select(): boolean {
		return false;
	}

	constructor() {
		super();
		this.onmouseover = () => {
			if (!this.lock && !this.unselectable) {
				this.active = true;
			}
		};
		/*
            this.onmouseout=()=>{
                if(!this.lock && !this.unselectable){
                    //this.active=false;
                }
            }
            this.onclick=()=>{
                if(!this.lock && !this.unselectable){
                    this.doPress();
                }
            }
            */
	}

	//abstract doPress():void;

	protected update(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		super.update(changedProperties);
		if (changedProperties.has('active') && this.active) {
			const result = MI.setActiveComponent(this);
			if (!result) {
				this.active = false;
			} else {
				this.setParentsCursorToMe();
			}
		}
		const classes: Record<string, boolean> = {
			active: this.active,
			lock: this.lock,
			unselectable: this.unselectable,
		};
		for (let className in classes) {
			if (changedProperties.has(className)) {
				this.classList.toggle(className, classes[className]);
			}
		}
	}

	//================================================================

	getHints(): string {
		if (this.lock) {
			return 'locked!';
		}
		return this.hints;
	}
}
