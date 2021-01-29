import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeResponsibleRepository from '@modules/responsible/repositories/fakes/FakeResponsibleRepository';

// service
import UpdateResponsibleService from './UpdateResponsibleService';

// helpers
import ResponsibleBuilder from '../helpers/ResponsibleBuilder';

let fakeResponsibleRepository: FakeResponsibleRepository;
let updateResponsible: UpdateResponsibleService;

describe('UpdateResponsible', () => {
  beforeEach(() => {
    fakeResponsibleRepository = new FakeResponsibleRepository();
    updateResponsible = new UpdateResponsibleService(fakeResponsibleRepository);
  });

  it('should be able to update a responsible', async () => {
    const responsible = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setName('Peter').build(),
    );

    const updatedResponsible = await updateResponsible.execute({
      responsible_id: responsible.id,
      cpf: '10251862440',
      name: 'Peter updated',
      phone: '99886733',
      city: 'Acari',
    });

    expect(updatedResponsible.name).toBe('Peter updated');
    expect(updatedResponsible.cpf).toBe('10251862440');
    expect(updatedResponsible.phone).toBe('99886733');
    expect(updatedResponsible.city).toBe('Acari');
  });

  it('should not be able to update the profile non-existing responsible', async () => {
    await expect(
      updateResponsible.execute({
        responsible_id: 'non-existing-responsible',
        cpf: '10251862440',
        name: 'Peter updated',
        phone: '99886733',
        city: 'Acari',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user CPF in use', async () => {
    const user = await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).build(),
    );

    await fakeResponsibleRepository.create(
      new ResponsibleBuilder(uuidv4()).setCPF('CPF').build(),
    );

    await expect(
      updateResponsible.execute({
        responsible_id: user.id,
        cpf: 'CPF',
        name: 'Peter updated',
        phone: '99886733',
        city: 'Acari',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
