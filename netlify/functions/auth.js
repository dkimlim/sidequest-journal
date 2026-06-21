// Decap CMS's GitHub backend (decap-cms-lib-auth's NetlifyAuthenticator) opens
// a popup at `${base_url}/${auth_endpoint}?provider=github&site_id=...&scope=...`.
// This kicks off the OAuth dance by redirecting that popup to GitHub.
export default async (req) => {
	const url = new URL(req.url);
	const scope = url.searchParams.get('scope') || 'repo';
	const state = crypto.randomUUID();
	const redirectUri = new URL('/callback', url).toString();

	const params = new URLSearchParams({
		client_id: process.env.OAUTH_CLIENT_ID,
		redirect_uri: redirectUri,
		scope,
		state,
	});

	return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
};

export const config = { path: '/api/auth' };
