

const devUrl = 'https://npl-tools-api-dev.genmapper.com/api/';
const prodUrl = 'https://npl-tools-api.genmapper.com/api/';

let _BaseUrl: string = prodUrl;

if (window.location.host === 'dev.noplaceleft.tools') {
    _BaseUrl = devUrl;
}

export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: _BaseUrl
};
