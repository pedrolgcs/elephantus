import ICreateClassroomDTO from '@modules/classrooms/dtos/ICreateClassroomDTO';

interface IClassroomDTO extends ICreateClassroomDTO {
  id: string;
}

class ClassroomBuilder {
  private classroomData: IClassroomDTO;

  constructor(id: string) {
    this.classroomData = {
      id,
      name: 'any_name',
      shift: 'morning',
      user_id: 'user_id',
      teacher_id: 'teacher_id',
    };
  }

  public setName(name: string) {
    this.classroomData.name = name;
    return this;
  }

  public setShift(shift: 'morning' | 'afternoon' | 'night') {
    this.classroomData.shift = shift;
    return this;
  }

  public setUser(user_id: string) {
    this.classroomData.user_id = user_id;
    return this;
  }

  public setTeacher(teacher_id: string) {
    this.classroomData.teacher_id = teacher_id;
    return this;
  }

  public build() {
    return this.classroomData;
  }
}

export default ClassroomBuilder;
