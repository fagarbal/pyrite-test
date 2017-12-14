export function state(store: any, prop?: string): Function {
	return function (target: any, key: string): void {
		const decorator = function (this: any) {
			const value = store.get(prop);

			this[key] = value;
		};

		if (!target.decorators) target.decorators = [];

		target.decorators.push(decorator);
	}
}