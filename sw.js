const APP='cbk-app-v3';
const OFFLINE='cbk-bible-v3';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(APP).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===self.location.origin){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(APP).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))}});
