"use strict";var precacheConfig=[["/index.html","66c38b8afbb2400adfcdbab3941f43be"],["/static/css/main.e68ea097.css","acd15172c33f001a7485793a77ab7e54"],["/static/js/main.f088342c.js","69b9ea5791dd2ddc7f664d8f388b58f0"],["/static/media/0.6443fcea.jpeg","6443fcea9bbfb7be788b0b5179a0cb6c"],["/static/media/1.9cf9002b.jpeg","9cf9002b857606fd22c0a141e6095e83"],["/static/media/2.d9253cc8.jpeg","d9253cc8066efd35b88c8bbb1e474381"],["/static/media/3.0dcd6e5b.jpeg","0dcd6e5b855d90c3fa6cc506ed744a95"],["/static/media/4.28b6fd21.jpg","28b6fd2127e634346f138678f0ba16d5"],["/static/media/bg1.4200188c.jpg","4200188c9c81d82929f2d01d180ba3a0"],["/static/media/bottom.828f0bba.svg","828f0bba3fbff476dcc068f54492af0f"],["/static/media/handle_change.2b3e3be7.png","2b3e3be72be80f50267357776c95df26"],["/static/media/left.98b49d62.svg","98b49d627017067894fa154ab66665e9"],["/static/media/logo.32c8ee51.png","32c8ee5160972116efb315928bae2539"],["/static/media/ol1.b14e6619.png","b14e661986817c4894e30df4916dde86"],["/static/media/ol2.1ea810de.png","1ea810def26e8950b89c7cc6957656e7"],["/static/media/ol3.7fdbd9cb.png","7fdbd9cbd84f70515e180d6bc1570fd0"],["/static/media/right.393e8027.svg","393e8027e014e3af5f752ac7cf062cc8"],["/static/media/top.4fa41169.svg","4fa41169667a970bb2272b3e0ae6de43"],["/static/media/white.1d10434a.jpg","1d10434a714601daceb2816d66a1772b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});