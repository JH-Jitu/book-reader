import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export function getCachedData(key) {
  return cache.get(key);
}

export function setCachedData(key, data) {
  cache.set(key, data);
}
