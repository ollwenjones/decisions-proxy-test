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
