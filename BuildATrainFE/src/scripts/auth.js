function getCookie(cookieName) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
    if (cookie.startsWith(`${cookieName}=`)) {
        return cookie.substring(cookieName.length + 1);
    }
    }
    return null;
}

// Read the OAuth token from the cookie
const oauthToken = getCookie('oauth_token');

// Update the HTML element with the token message
if (oauthToken) {
    document.getElementById('tokenMessage').textContent = `OAuth Token: ${oauthToken}`;
} else {
    document.getElementById('tokenMessage').textContent = 'OAuth Token not found.';
}
