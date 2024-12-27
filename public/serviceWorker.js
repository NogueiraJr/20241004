const CACHE_NAME = "ocst-app-cache-v2"; // Atualize a versão do cache ao lançar uma nova versão
const urlsToCache = ["/", "/ini", "/dds", "/opr", "/utl"]; // Rotas a serem armazenadas em cache

// Evento de instalação do Service Worker
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Adicionando arquivos ao cache...");
      return cache.addAll(urlsToCache);
    })
  );

  // Força o novo Service Worker a ser ativado imediatamente
  self.skipWaiting();
});

// Evento de ativação do Service Worker
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Ativando...");

  const cacheWhitelist = [CACHE_NAME]; // Lista de caches permitidos (o atual)

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`[Service Worker] Removendo cache antigo: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );

  // Faz o novo Service Worker assumir o controle imediatamente
  self.clients.claim();
});

// Evento de interceptação de requisições (fetch)
self.addEventListener("fetch", (event) => {
  console.log(`[Service Worker] Interceptando requisição para: ${event.request.url}`);

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Atualiza o cache com a nova resposta
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Usa o cache como fallback caso a rede falhe
        return caches.match(event.request);
      })
  );
});
