let token = localStorage.getItem('token');

if (token == null || !isValidToken(parseJwt(token))) {
    localStorage.removeItem('token');
    window.location.replace('../../index.html')
} else {
    const details = parseJwt(token);

    const contains = details.authorities.find(a => a.authority === 'ADMIN');
    if (!contains) window.location.replace('../../index.html');
}
