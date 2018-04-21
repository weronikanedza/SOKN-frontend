let token = localStorage.getItem('token');

if (token != null) {
    const details = parseJwt(token);

    const contains = details.authorities.find(a => a.authority === 'ADMIN');
    if (contains) window.location.replace('/admin/main/index.html');
    else window.location.replace('/author/main/index.html');
}
