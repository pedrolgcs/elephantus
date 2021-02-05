import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeNurseriesRepository from '@modules/nurseries/repositories/fakes/FakeNurseriesRepository';

// service
import ShowNurseryService from './ShowNurseryService';

// helpers
import NurseryBuilder from '../helpers/NurseryBuilder';

let showNursery: ShowNurseryService;
let fakeNurseriesRepository: FakeNurseriesRepository;

describe('ShowNursery', () => {
  beforeEach(() => {
    fakeNurseriesRepository = new FakeNurseriesRepository();
    showNursery = new ShowNurseryService(fakeNurseriesRepository);
  });

  it('should be able to show the nursery', async () => {
    const create_nursery = await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).build(),
    );
    const nursery = await showNursery.execute({
      nursery_id: create_nursery.id,
    });
    expect(nursery.name).toBe('any_name');
  });

  it('should not be able to show the nursery on non existing id', async () => {
    await expect(
      showNursery.execute({ nursery_id: 'non-existing-nursery-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
