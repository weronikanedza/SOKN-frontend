window.SERVER_URL = 'http://localhost:8080';

const queryParam = param => {
    let params = new URL(window.location.href).searchParams;
    return params.get(param);
};