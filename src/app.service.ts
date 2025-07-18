import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  // inject cache manager
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 });
    const cachedData = await this.cacheManager.get('cached_item');
    await this.cacheManager.del('cached_item');
    console.log(await this.cacheManager.get('cached_item'));
    console.log(cachedData);
    return 'hello world';
  }
}
