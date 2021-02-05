import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeNurseriesRepository from '@modules/nurseries/repositories/fakes/FakeNurseriesRepository';

// service
import DeleteNurseryService from './DeleteNurseryService';

// helpers
import NurseryBuilder from '../helpers/NurseryBuilder';

let fakeNurseriesRepository: FakeNurseriesRepository;
let deleteNursery: DeleteNurseryService;

describe('DeleteNursery', () => {
  beforeEach(() => {
    fakeNurseriesRepository = new FakeNurseriesRepository();
    deleteNursery = new DeleteNurseryService(fakeNurseriesRepository);
  });

  it('should be able to delete a nursery', async () => {
    const nursery = await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).build(),
    );

    await expect(
      deleteNursery.execute({ nursery_id: nursery.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a nursery on non existing id', async () => {
    await expect(
      deleteNursery.execute({ nursery_id: 'non-existing-nursery-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
