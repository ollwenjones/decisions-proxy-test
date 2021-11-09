# Example Web Server With Proxy

Browsers are getting more and more strict with cross site cookies, in order to protect users' privacy.

By passing Decisions traffic through a proxy, a Decisions form can be loaded in an iframe
that appears to be same-domain, avoiding cross-domain concerns.

_(NOTE: The "x-proxied-from" header in this example is currently experimental, and requires a patch to 
Decisions web-host layer.

It's scheduled for 7.10.
)_



## To Set Up This Example

This example uses a nodejs server, so it requires nodejs. In this directory `yarn` or `npm install`, then `yarn start` or `npm start`.

## Other Servers

Configuration of a proxy with request rewrite is specific to each web server or load balancer technology, but most of them provide this feature one way or another.

The key elements of this are 
1. Catch traffic to a specific path in the host site and proxy it to your decisions instance.
2. Rewrite the URLs during proxy so when the request goes to Decisions to ensure it makes it to the right place.
3. Add the `x-proxied-from` header - this tells the Decisions UI to render in a way that passes all HTTP traffic through the host site, avoiding cross-domain issues.
4. If necessary add `x-proxied-from-path-base` so Decisions UI can specify the correct path base in HTML embedded URLs
    * e.g. you are catching `/decisions` in your proxy test, but the decisions Url path base is something else.

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
