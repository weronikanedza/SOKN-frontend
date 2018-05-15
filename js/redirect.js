let token = localStorage.getItem('token');

if (token == null || !isValidToken(parseJwt(token))) {
    localStorage.removeItem('token');
} else {
    const details = parseJwt(token);

    const authorities = details.authorities;
    if (authorities.find(a => a.authority === 'ADMIN'))
        window.location.replace('/admin/main/index.html');
    else if (authorities.find(a => a.authority === 'AUTHOR' && authorities.length === 1))
        window.location.replace('/author/main/index.html');
    else if (authorities.find(a => a.authority === 'REVIEWER'))
        window.location.replace('/reviewer/main/index.html')
}
