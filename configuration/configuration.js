window.SERVER_URL = 'http://85.255.11.29:8080';

const queryParam = param => {
    let params = new URL(window.location.href).searchParams;
    return params.get(param);
};

const parseJwt = token => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

const isValidToken = token => {
   return token.exp > (new Date().getTime() / 1000);
};

