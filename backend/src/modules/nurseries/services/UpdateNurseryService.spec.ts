import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeNurseriesRepository from '@modules/nurseries/repositories/fakes/FakeNurseriesRepository';

// service
import UpdateNurseryService from './UpdateNurseryService';

// helpers
import NurseryBuilder from '../helpers/NurseryBuilder';

let updateNursery: UpdateNurseryService;
let fakeNurseriesRepository: FakeNurseriesRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeNurseriesRepository = new FakeNurseriesRepository();
    updateNursery = new UpdateNurseryService(fakeNurseriesRepository);
  });

  it('should be able to update the nursery', async () => {
    const nursery = await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).build(),
    );

    const updatedNursery = await updateNursery.execute({
      nursery_id: nursery.id,
      name: 'updated_name',
      city: 'updated_city',
    });

    expect(updatedNursery.name).toBe('updated_name');
    expect(updatedNursery.city).toBe('updated_city');
  });

  it('should not be able to update the nursery if non-existing id', async () => {
    await expect(
      updateNursery.execute({
        nursery_id: 'non-existing-nursery',
        name: 'updated_name',
        city: 'updated_city',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
