export function setCookie(name: string, value: string, days = 7) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=None; Secure`;
}

export function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';')[0] || '');
	return null;
}

export function deleteCookie(name: string) {
	document.cookie = `${name}=; Max-Age=0; path=/; SameSite=None; Secure`;
}
