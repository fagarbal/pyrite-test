function cloneDeep (obj: any): any {
	if (!obj || typeof obj !== 'object') {
		return obj;
	} else if (Array.isArray(obj)) {
		return obj.map(cloneDeep);
	} else if (typeof obj === 'object') {
		var cloned: any = {};

		for (var prop in obj) {
			if (Object.hasOwnProperty.call(obj, prop)) {
				cloned[prop] = cloneDeep(obj[prop]);
			}
		}

		return cloned;
	} else {
		return obj;
	}
}

export function clone (obj: any, extras: any): any {
	return Object.assign({}, cloneDeep(obj), extras);
}