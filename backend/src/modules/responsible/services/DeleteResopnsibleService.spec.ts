import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeResponsibleRepository from '@modules/responsible/repositories/fakes/FakeResponsibleRepository';

// service
import DeleteResopnsibleService from './DeleteResopnsibleService';

// helpers
import ResponsibleBuilder from '../helpers/ResponsibleBuilder';

let fakeResponsibleRepository: FakeResponsibleRepository;
let deleteResopnsible: DeleteResopnsibleService;

describe('DeleteResponsible', () => {
  beforeEach(() => {
    fakeResponsibleRepository = new FakeResponsibleRepository();
    deleteResopnsible = new DeleteResopnsibleService(fakeResponsibleRepository);
  });

  it('should be able to delete a resopnsible by ID', async () => {
    const responsible = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).build(),
    );

    await expect(
      deleteResopnsible.execute({ responsible_id: responsible.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a responsible on non existing id', async () => {
    await expect(
      deleteResopnsible.execute({
        responsible_id: 'non-existing-responsible',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
