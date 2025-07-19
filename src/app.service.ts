import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  // inject cache manager
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache) { }

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 }, 20);
    const cachedItem = await this.cacheManager.get('cached_item');

    return { key: cachedItem, message: 'Hello World' };
  }
}
