import { Repository, getRepository, Raw } from 'typeorm';

// repository
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

// dtos
import ICreateClassroomDTO from '@modules/classrooms/dtos/ICreateClassroomDTO';
import IFiltersClassroomDTO from '@modules/classrooms/dtos/IFiltersClassroomDTO';

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
        teacher_id: classroom.teacher_id,
      })
      .where('id = :id', { id: classroom.id })
      .execute();
    return this.ormRepository.findOne(classroom.id, { relations: ['user'] });
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(
    user_id: string,
    { name, shift }: IFiltersClassroomDTO,
  ): Promise<Classroom[]> {
    const classrooms = await this.ormRepository.find({
      where: {
        name: Raw(field => `${field} ILIKE '%${name}%'`),
        shift: Raw(field => `${field} ILIKE '%${shift}%'`),
        user_id,
      },
      order: {
        name: 'ASC',
      },
      relations: ['teacher'],
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

  public async findByTeacher(teacher_id: string): Promise<Classroom[]> {
    const classrooms = await this.ormRepository.find({
      where: { teacher_id },
    });

    return classrooms;
  }
}

export default ClassroomsRepository;
