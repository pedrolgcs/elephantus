import { v4 } from 'uuid';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// dtos
import ICreateClassroomDTO from '../../dtos/ICreateClassroomDTO';
import IFiltersClassroomDTO from '../../dtos/IFiltersClassroomDTO';

// repository
import IClassroomsRepository from '../IClassroomsRepository';

class FakeClassroomsRepository implements IClassroomsRepository {
  private classrooms: Classroom[] = [];

  public async create(classroomData: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = new Classroom();
    Object.assign(classroom, { id: v4() }, classroomData);
    this.classrooms.push(classroom);
    return classroom;
  }

  public async save(classroom: Classroom): Promise<Classroom> {
    const findIndex = this.classrooms.findIndex(
      element => element.id === classroom.id,
    );
    this.classrooms[findIndex] = classroom;
    return classroom;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.classrooms.findIndex(element => element.id === id);
    this.classrooms.splice(findIndex, 1);
  }

  public async find(
    user_id: string,
    filters: IFiltersClassroomDTO,
  ): Promise<Classroom[]> {
    const searchName = new RegExp(filters.name, 'i');
    const findClassrooms = this.classrooms.filter(
      classroom =>
        searchName.test(classroom.name) && classroom.user_id === user_id,
    );

    return findClassrooms;
  }

  public async findById(id: string): Promise<Classroom | undefined> {
    const classroom = this.classrooms.find(element => element.id === id);
    return classroom;
  }

  public async findByTeacher(teacher_id: string): Promise<Classroom[]> {
    const classroom = this.classrooms.filter(
      element => element.teacher_id === teacher_id,
    );

    return classroom;
  }
}

export default FakeClassroomsRepository;
