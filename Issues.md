
### Safari Works, and has these cookies:
* ASP.NET_SessionId
* ContextDisplayType
* DecisionsSessionID
* ForceStudio
* InSession
* io
* WFAuthCookie

### Chrome on Mac Logs out after first form

It works up to ResumeFlowWithTrackingId after SelectPath, which response is a redirect to logout

It only has these cookies:

* ContextDisplayType
* DecisionsSessionID
* ForceStudio
* InSession
* io


So the cookies not being set because they are marked samesite-none but not "secure" must be:

* ASP.NET_SessionId
* WFAuthCookie

> Cookies marked with SameSite=None must also be marked with Secure to allow setting them in a cross-site context. This behavior protects user data from being sent over an insecure connection.

This could be because my secure cookie config is not correct per the docs

The following were filtered because their path is `/decisions/Primary/H` instead of `/`
* LoginPageContextDisplayType
* DisplayTypeCookie
* ContextClientSessionID