import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeResponsibleRepository from '@modules/responsible/repositories/fakes/FakeResponsibleRepository';

// service
import CreateResponsibleService from './CreateResponsibleService';

// helpers
import ResponsibleBuilder from '../helpers/ResponsibleBuilder';

let createResponsible: CreateResponsibleService;
let fakeResponsibleRepository: FakeResponsibleRepository;

describe('CreateResponsibleService', () => {
  beforeEach(() => {
    fakeResponsibleRepository = new FakeResponsibleRepository();
    createResponsible = new CreateResponsibleService(fakeResponsibleRepository);
  });

  it('should be able to create a new responsible', async () => {
    const responsibleData = new ResponsibleBuilder(uuidv4()).build();

    const responsible = await createResponsible.execute(responsibleData);

    expect(responsible).toHaveProperty('id');
  });

  it('should not be able to create a new responsible with same CPF another', async () => {
    await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setCPF('CPF').build(),
    );

    await expect(
      createResponsible.execute(
        new ResponsibleBuilder(uuidv4()).setCPF('CPF').build(),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
