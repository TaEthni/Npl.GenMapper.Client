

const devUrl = 'https://dev-api.noplaceleft.tools/api/';
const prodUrl = 'https://api.noplaceleft.tools/api/';

let _BaseUrl: string = prodUrl;

if (window.location.host === 'dev.noplaceleft.tools') {
    _BaseUrl = devUrl;
}

export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: _BaseUrl
};
