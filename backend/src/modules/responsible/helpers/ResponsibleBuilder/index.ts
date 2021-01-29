import ICreateResponsibleDTO from '@modules/responsible/dtos/ICreateResponsibleDTO';

interface IResponsibleDTO extends ICreateResponsibleDTO {
  id: string;
}

class ReminderBuilder {
  private responsibleData: IResponsibleDTO;

  constructor(id: string) {
    this.responsibleData = {
      id,
      cpf: 'any_cpf',
      name: 'any_name',
      phone: 'any_phone',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      street: 'any_street',
      number: 'any_number',
    };
  }

  public setCPF(cpf: string) {
    this.responsibleData.cpf = cpf;
    return this;
  }

  public setName(name: string) {
    this.responsibleData.name = name;
    return this;
  }

  public setPhone(phone: string) {
    this.responsibleData.phone = phone;
    return this;
  }

  public build() {
    return this.responsibleData;
  }
}

export default ReminderBuilder;
