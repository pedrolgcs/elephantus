import { v4 } from 'uuid';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// dtos
import ICreateClassroomDTO from '../../dtos/ICreateClassroomDTO';

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

  public async find(name?: string): Promise<Classroom[]> {
    const searchName = new RegExp(name, 'i');
    const findRoles = this.classrooms.filter(user =>
      searchName.test(user.name),
    );

    return findRoles;
  }

  public async findById(id: string): Promise<Classroom | undefined> {
    const classroom = this.classrooms.find(element => element.id === id);
    return classroom;
  }

  public async findByNameAndShift(
    name: string,
    shift: string,
  ): Promise<Classroom | undefined> {
    const classroom = this.classrooms.find(
      element => element.name === name && element.shift === shift,
    );
    return classroom;
  }

  public async findByUser(user_id: string): Promise<Classroom[]> {
    const classroom = this.classrooms.filter(
      element => element.user_id === user_id,
    );

    return classroom;
  }
}

export default FakeClassroomsRepository;
