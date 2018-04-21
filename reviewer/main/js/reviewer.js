let token = localStorage.getItem('token');

if (token == null) {
    window.location.replace('../../index.html')
} else {
    const details = parseJwt(token);

    const contains = details.authorities.find(a => a.authority === 'REVIEWER');
    if (!contains) window.location.replace('../../index.html');
}
