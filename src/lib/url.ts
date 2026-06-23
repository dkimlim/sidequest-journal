// GitHub Pages serves this site from a repo subpath (e.g. /sidequest-journal/),
// so hardcoded absolute paths need the configured base prepended. Astro's
// BASE_URL always has a trailing slash; `path` should start with `/`.
export function withBase(path: string): string {
	return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}

export function slugifyTag(tag: string): string {
	return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

export function tagUrl(tag: string): string {
	return withBase(`/tags/${slugifyTag(tag)}/`);
}
