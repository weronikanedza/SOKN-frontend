SERVER_URL = 'http://85.255.11.29:8080';

const queryParam = param => {
    let params = new URL(window.location.href).searchParams;
    return params.get(param);
};