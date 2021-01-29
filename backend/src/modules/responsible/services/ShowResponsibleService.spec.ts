import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeResponsibleRepository from '@modules/responsible/repositories/fakes/FakeResponsibleRepository';

// service
import ShowResponsibleService from './ShowResponsibleService';

// helpers
import ResponsibleBuilder from '../helpers/ResponsibleBuilder';

let fakeResponsibleRepository: FakeResponsibleRepository;
let showResponsible: ShowResponsibleService;

describe('ShowResponsible', () => {
  beforeEach(() => {
    fakeResponsibleRepository = new FakeResponsibleRepository();
    showResponsible = new ShowResponsibleService(fakeResponsibleRepository);
  });

  it('should be able to show a responsible by ID', async () => {
    const peter = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setName('Peter').build(),
    );

    const responsible = await showResponsible.execute({
      responsible_id: peter.id,
    });

    expect(responsible.name).toBe('Peter');
  });

  it('should be able to show a responsible by CPF', async () => {
    await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setCPF('123').build(),
    );

    await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setCPF('456').build(),
    );

    const peter = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setName('Peter').build(),
    );

    const responsible = await showResponsible.execute({
      cpf: peter.cpf,
    });

    expect(responsible.name).toBe('Peter');
  });

  it('should not be able to show a responsible with non existing id', async () => {
    await expect(
      showResponsible.execute({
        responsible_id: 'non-existing-responsible',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
