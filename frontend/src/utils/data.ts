type json = Record<string, any>;

export function setData(key: string, data: json | json[] | string | number) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch {
		localStorage.setItem(key, data)
	}
}

export function getData(key: string) {
	try {
		return JSON.parse(localStorage.getItem(key) ?? "");
	} catch {
		return localStorage.getItem(key) ?? "";
	}
}
