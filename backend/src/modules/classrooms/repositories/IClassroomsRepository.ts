import Classroom from '../infra/typeorm/entities/Classroom';

// dtos
import ICreateClassroomDTO from '../dtos/ICreateClassroomDTO';
import IFiltersClassroomDTO from '../dtos/IFiltersClassroomDTO';

export default interface IClassroomsRepository {
  create(data: ICreateClassroomDTO): Promise<Classroom>;
  save(classroom: Classroom): Promise<Classroom>;
  deleteById(id: string): Promise<void>;
  find(user_id: string, filters: IFiltersClassroomDTO): Promise<Classroom[]>;
  findById(id: string): Promise<Classroom | undefined>;
  findByTeacher(teacher_id: string): Promise<Classroom[]>;
}
