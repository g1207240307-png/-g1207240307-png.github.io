const C='ev-english-v3';
const scope=self.registration.scope;
const A=['','manifest.webmanifest','app-icon.svg','data/terms.json.gz','data/categories.json'].map(x=>new URL(x,scope).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{caches.open(C).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>caches.match(scope))))});
