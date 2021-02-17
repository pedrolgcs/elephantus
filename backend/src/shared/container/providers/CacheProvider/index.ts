import { container } from 'tsyringe';

// implementations
import RedisCacheProvider from './implementations/RedisCacheProvider';

// model
import ICacheProvider from './models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('StorageProvider', providers.redis);
