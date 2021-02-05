import { v4 as uuidv4 } from 'uuid';

// fakes
import FakeNurseriesRepository from '@modules/nurseries/repositories/fakes/FakeNurseriesRepository';

// service
import ListNurseriesByCityService from './ListNurseriesByCityService';

// helpers
import NurseryBuilder from '../helpers/NurseryBuilder';

let listNurseriesByCity: ListNurseriesByCityService;
let fakeNurseriesRepository: FakeNurseriesRepository;

describe('ListNurseriesByCity', () => {
  beforeEach(() => {
    fakeNurseriesRepository = new FakeNurseriesRepository();
    listNurseriesByCity = new ListNurseriesByCityService(
      fakeNurseriesRepository,
    );
  });

  it('should be able to list nurseries by city', async () => {
    const nursery_01 = await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).setCity('Acari').build(),
    );

    const nursery_02 = await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).setCity('Acari').build(),
    );

    await fakeNurseriesRepository.create(
      new NurseryBuilder(uuidv4()).setCity('Currais Novos').build(),
    );

    const nurseries = await listNurseriesByCity.execute({ city: 'Acari' });

    expect(nurseries).toEqual(expect.arrayContaining([nursery_01, nursery_02]));
    expect(nurseries).toHaveLength(2);
  });
});
