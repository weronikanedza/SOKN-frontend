let token = localStorage.getItem('token');

if (token == null) {
    window.location.replace('../../index.html')
} else {
    const details = parseJwt(token);

    const contains = details.authorities.find(a => a.authority === 'AUTHOR');
    if (!contains || details.authorities.length > 1)
        window.location.replace('../../index.html');
}
