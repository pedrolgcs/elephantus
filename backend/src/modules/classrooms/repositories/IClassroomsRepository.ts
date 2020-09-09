import Classroom from '../infra/typeorm/entities/Classroom';

// dtos
import ICreateClassroomDTO from '../dtos/ICreateClassroomDTO';

export default interface IClassroomsRepository {
  create(data: ICreateClassroomDTO): Promise<Classroom>;
  save(classroom: Classroom): Promise<Classroom>;
  deleteById(id: string): Promise<void>;
  find(): Promise<Classroom[]>;
  findById(id: string): Promise<Classroom | undefined>;
  findByNameAndShift(
    name: string,
    shift: string,
  ): Promise<Classroom | undefined>;
}
