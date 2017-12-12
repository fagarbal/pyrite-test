import { Action, dispatcher } from './dispatcher';
import { clone } from "./clone";

export class Store {
	private state: any;
	private handlers: any;

	constructor(initialState: any) {
		this.state = initialState || {};
		this.handlers = {};

		dispatcher.register((action: any) => {
			if (this.handlers[action.type]) {
				const state = this.handlers[action.type].call(this, action, this.state) || this.state;
				const newState = clone(this.state, state);

				if (!newState) throw new Error('Action handlers on store must return new state');

				this.state = newState;
			}
		});
	}
	
	get(attr: string) {
		if (!attr) return this.state;
		return this.state[attr];
	}

	on(actionType: any, handler: Function) {
		if (!actionType) throw new TypeError('actionType must be defined');

		this.handlers[actionType] = handler;
	}
}