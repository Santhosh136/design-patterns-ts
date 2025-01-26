interface InMemoryCache {
  get(key: string): string;
  put(key: string, value: string, ttl: number): void;
}

class Redis implements InMemoryCache {

  public get(key: string): string {
      return `value of ${key} from redis`;
  }

  public put(key: string, value: string, ttl: number): void {
      console.log(`cached value for ${key} in redis`);
  }
}

class ValKey implements InMemoryCache {

  public get(key: string): string {
      return `value of ${key} from valkey`;
  }

  public put(key: string, value: string, ttl: number): void {
      console.log(`cached value for ${key} in valkey`);
  }
}

class Memcache implements InMemoryCache {

  public get(key: string): string {
      return `value of ${key} from memcache`;
  }

  public put(key: string, value: string, ttl: number): void {
      console.log(`cached value for ${key} in memcache`);
  }
}

class CacheFactory {
  static getCache(provider: string): InMemoryCache {
    switch(provider) {
      case "redis": return new Redis();
      case "valkey": return new ValKey();
      case "memcache": return new Memcache();
    }
    throw new Error("Provider not supported...")
  }
}

const redisCache = CacheFactory.getCache("redis");
redisCache.put("hi", "hello", 60);
console.log(redisCache.get("hi"));

const valkeyCache = CacheFactory.getCache("valkey");
valkeyCache.put("hi", "hello", 60);
console.log(valkeyCache.get("hi"));

