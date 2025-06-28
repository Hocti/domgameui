import { UIPanel } from './UIInterface';
import { UIParentRootBase } from './UIParentBase';
import { css, CSSResultGroup } from 'lit';
import { centerCSS } from './Layer';
import UIMaster from '../UIMaster';

const s = (v: number) => css`calc(${v} * var(--rootS))`;
//const l = (v: number) => css`calc(${v} * var(--rootL))`;
const w = (v: number) => css`calc(${v} / 100 * var(--rootWidth))`;
const h = (v: number) => css`calc(${v} / 100 * var(--rootHeight))`;

export abstract class UIPanelBase extends UIParentRootBase implements UIPanel {
	//panel

	static styles: CSSResultGroup = [
		super.styles,
		css`
			:host {
				${centerCSS}
				border:${s(0.3)} solid yellow;
				border-radius: ${s(1.5)};
				background-color: rgba(255, 255, 255, 0.5);
				padding: 3rem;
				width: auto;
				height: auto;
				min-width: 40rem;
				min-height: 25rem;
				max-width: ${w(95)};
				max-height: ${h(95)};
			}
		`,
	];

	clickBG2Close: boolean = false;
	allowUserClose: boolean = true;

	async close(): Promise<void> {
		await this.exitAni();
		UIMaster.getInstance().closedPanel(this);
	}
}
