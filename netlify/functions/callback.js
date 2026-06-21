// GitHub redirects here with ?code=... after the user approves access. We
// exchange the code for an access token, then hand it back to the Decap CMS
// tab via the exact postMessage handshake decap-cms-lib-auth's
// NetlifyAuthenticator expects:
//   1. popup -> opener: "authorizing:github" (origin unknown yet, so "*")
//   2. opener -> popup: echoes that same message back (now popup knows the
//      opener's real origin)
//   3. popup -> opener: "authorization:github:success:<json>" targeted at
//      that origin
function renderScript(provider, message, content) {
	// Pre-build the full message string server-side, then safely embed it as a
	// JS string literal (JSON.stringify handles escaping the quotes from the
	// JSON payload it contains) — embedding it any other way risks double
	// encoding or broken escaping.
	const fullMessage = `authorization:${provider}:${message}:${JSON.stringify(content)}`;
	return `<!doctype html><html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(fullMessage)}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:${provider}', '*');
})();
</script></body></html>`;
}

export default async (req) => {
	const url = new URL(req.url);
	const code = url.searchParams.get('code');
	const error = url.searchParams.get('error');

	if (error) {
		const html = renderScript('github', 'error', {
			message: url.searchParams.get('error_description') || error,
		});
		return new Response(html, { headers: { 'Content-Type': 'text/html' } });
	}

	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: process.env.OAUTH_CLIENT_ID,
			client_secret: process.env.OAUTH_CLIENT_SECRET,
			code,
		}),
	});
	const data = await tokenRes.json();

	const html = data.access_token
		? renderScript('github', 'success', { token: data.access_token, provider: 'github' })
		: renderScript('github', 'error', {
				message: data.error_description || 'GitHub did not return an access token.',
			});

	return new Response(html, { headers: { 'Content-Type': 'text/html' } });
};

export const config = { path: '/callback' };
