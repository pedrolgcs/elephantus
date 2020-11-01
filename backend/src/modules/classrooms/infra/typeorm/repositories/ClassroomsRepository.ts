import { Repository, getRepository, Raw } from 'typeorm';

// repository
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

// dtos
import ICreateClassroomDTO from '@modules/classrooms/dtos/ICreateClassroomDTO';

// entities
import Classroom from '../entities/Classroom';

class ClassroomsRepository implements IClassroomsRepository {
  private ormRepository: Repository<Classroom>;

  constructor() {
    this.ormRepository = getRepository(Classroom);
  }

  public async create(data: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.ormRepository.create(data);
    await this.ormRepository.save(classroom);
    return classroom;
  }

  public async save(classroom: Classroom): Promise<Classroom> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Classroom)
      .set({
        name: classroom.name,
        shift: classroom.shift,
        user_id: classroom.user_id,
      })
      .where('id = :id', { id: classroom.id })
      .execute();
    return this.ormRepository.findOne(classroom.id);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(name: string): Promise<Classroom[]> {
    const classrooms = await this.ormRepository.find({
      where: {
        name: Raw(field => `${field} ILIKE '%${name}%'`),
      },
      order: {
        name: 'ASC',
      },
    });
    return classrooms;
  }

  public async findById(id: string): Promise<Classroom | undefined> {
    const classroom = await this.ormRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return classroom;
  }

  public async findByNameAndShift(
    name: string,
    shift: string,
  ): Promise<Classroom | undefined> {
    const classroom = await this.ormRepository.findOne({
      where: { name, shift },
      relations: ['user'],
    });
    return classroom;
  }
}

export default ClassroomsRepository;
