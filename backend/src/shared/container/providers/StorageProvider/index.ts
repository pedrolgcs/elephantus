import { container } from 'tsyringe';

// config
import uploadConfig from '@config/upload';

// implementations
import DiskStorageProvider from './implementations/DiskStorageProvider';

// model
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
