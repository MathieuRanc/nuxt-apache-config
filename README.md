# Apache configuration

A module for Nuxt.js.

## Usage

![image](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Apache_Feather_Logo.svg/339px-Apache_Feather_Logo.svg.png)
The nuxt-apache-config module allows you to generate a .htaccess configuration file in the "static" folder with custom settings hands down.
For security reasons, it is advisable to put the configuration values in an environment variable because it is the configuration of your server that risks being exposed publicly.
For the moment, this module only allows a basic configuration including http redirection in https, the redirection of 404 pages to the home page or a custom page, and for static sites the limitation of GET type requests.

## Setup

Add nuxt-apache-config dependency using yarn or npm to your project

```bash
yarn add nuxt-apache-config # or npm install
```

Add nuxt-apache-config to modules section of `nuxt.config.js`

```javascript
{
  modules: [
    ['nuxt-apache-config',
      {
        https: true,
        redirection: true,
        redirectUrl: '404.html',
        indexes: true,
        onlyGET: true,
      }
    ] ,
  ],
}
```

- `https` redirects http pages to https
- `redirection` allows to redirect 404 pages to the homepage
- `redirectUrl` allows to define the redirect page
- `indexes` redirect indexes list to 403 error
- `onlyGET` allows to limit requests to the GET type

Optionally add .htaccess to .gitignore file.

## Development

```bash
git clone https://github.com/MathieuRanc/nuxt-apache-config.git
cd nuxt-apache-config
yarn
```

## Note

This project generated by [create-nuxt-module](https://github.com/potato4d/create-nuxt-module)
