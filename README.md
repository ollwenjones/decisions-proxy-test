# Example Web Server With Proxy

Browsers are getting more and more strict with cross site cookies, in order to protect users' privacy.

By passing Decisions traffic through a proxy, a Decisions form can be loaded in an iframe
that appears to be same-domain, avoiding cross-domain concerns.

_(NOTE: The "x-proxied-from" header in this example is currently experimental, and requires a patch to 
Decisions 6.x web-host layer.)_

## To Set Up

This example uses a nodejs server, so it requires nodejs. In this directory `yarn` or `npm install`, then `yarn start` or `npm start`.

## Other Servers

Configuration of a proxy with request rewrite is specific to each web server technology, but most of them provide this feature.

## Cookies and SSL
This works as expected on Safari over HTTP, but Chrome for Mac will still be picky about secure cookies, so required, `ASP.NET_SessionId` and `WFAuthCookie` will not be set,
unless you have HTTPS/SSL on both the host site/proxy and the [Decisions server](https://documentation.decisions.com/docs/configuring-the-server-for-ssl-https),
and [configure the cookies to be secure by editing web.config files](https://documentation.decisions.com/docs/sso-redirection-samesite-cookies).



To configure this node server for HTTPS (e.g. on a Mac, since this was exercise was initially focused on Safari), generate an SSL Cert, using commands like

```sh
openssl genrsa -out server.key 2048
openssl req -new -x509 -key server.key -out server.cert -days 365
```

Then add the .cert to your Keychain, double click to edit and then elevate its trust level.