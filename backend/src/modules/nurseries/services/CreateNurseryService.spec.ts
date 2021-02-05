// fakes
import FakeNurseriesRepository from '@modules/nurseries/repositories/fakes/FakeNurseriesRepository';

// service
import CreateNurseryService from './CreateNurseryService';

let createNursery: CreateNurseryService;
let fakeNurseriesRepository: FakeNurseriesRepository;

describe('CreateNursery', () => {
  beforeEach(() => {
    fakeNurseriesRepository = new FakeNurseriesRepository();
    createNursery = new CreateNurseryService(fakeNurseriesRepository);
  });

  it('should be able to create a nursery', async () => {
    const nursery = await createNursery.execute({
      name: 'any_name',
      city: 'any_city',
    });

    expect(nursery).toHaveProperty('id');
    expect(nursery.name).toBe('any_name');
  });
});
