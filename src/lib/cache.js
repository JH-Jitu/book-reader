const cache = new Map();

export function setCache(key, value, ttl = 3600000) {
  // default TTL: 1 hour
  const item = {
    value,
    expiry: Date.now() + ttl,
  };
  cache.set(key, item);
}

export function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.value;
}
