export interface Action {
	type: string | symbol;
	[key: string]: any; 
}

class Dispatcher {
	private callbacks: Array<Function> = [];

	register(cb: Function) {
		this.callbacks.push(cb)
	}

	dispatch(action: Action) {
		if (!action.type) throw new TypeError('Action must have "type"')

		this.callbacks.forEach((callback) => callback(action));
	}
}

export const dispatcher = new Dispatcher();
export const dispatch = dispatcher.dispatch.bind(dispatcher);