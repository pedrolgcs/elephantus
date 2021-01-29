import { v4 as uuidv4 } from 'uuid';

// fakes
import FakeResponsibleRepository from '@modules/responsible/repositories/fakes/FakeResponsibleRepository';

// service
import ListResponsibleService from './ListResponsibleService';

// helpers
import ResponsibleBuilder from '../helpers/ResponsibleBuilder';

let fakeResponsibleRepository: FakeResponsibleRepository;
let listResponsible: ListResponsibleService;

describe('ListResponsible', () => {
  beforeEach(() => {
    fakeResponsibleRepository = new FakeResponsibleRepository();
    listResponsible = new ListResponsibleService(fakeResponsibleRepository);
  });

  it('should be able to list a responsible', async () => {
    const responsable_peter = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setName('Peter').build(),
    );

    const responsable_jana = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setName('Jana').build(),
    );

    const responsible = await listResponsible.execute();

    expect(responsible).toEqual(
      expect.arrayContaining([responsable_peter, responsable_jana]),
    );
    expect(responsible).toHaveLength(2);
  });
});
