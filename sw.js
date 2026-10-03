const CACHE='ai-companion-pwa-v19';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./apeiria_front_2p5d_upright.glb'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ai-companion-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{
    const copy=x.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return x;
  }).catch(()=>caches.match('./'))));
});
