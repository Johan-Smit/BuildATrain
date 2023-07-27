function getCookie(cookieName) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
    if (cookie.startsWith(`${cookieName}=`)) {
        const token = cookie.substring(cookieName.length + 1);
        if (cookieName === 'email') {
            const email = decodeURIComponent(token);
            return email;
        }
        return token;
    }
    }
    return null;
}

const oauthToken = getCookie('oauth_token');

// Update the HTML element with the token message
if (oauthToken) {
    sessionStorage.setItem('token', oauthToken);
} else {
    window.location.href='/login';
}
