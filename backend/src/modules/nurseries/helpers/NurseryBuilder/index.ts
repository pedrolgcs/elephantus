import ICreateNurseryDTO from '@modules/nurseries/dtos/ICreateNurseryDTO';

interface IRNurseryDTO extends ICreateNurseryDTO {
  id: string;
}

class NurseryBuilder {
  private nurseryData: IRNurseryDTO;

  constructor(id: string) {
    this.nurseryData = {
      id,
      name: 'any_name',
      city: 'any_city',
    };
  }

  public setName(name: string) {
    this.nurseryData.name = name;
    return this;
  }

  public setCity(city: string) {
    this.nurseryData.city = city;
    return this;
  }

  public build() {
    return this.nurseryData;
  }
}

export default NurseryBuilder;
