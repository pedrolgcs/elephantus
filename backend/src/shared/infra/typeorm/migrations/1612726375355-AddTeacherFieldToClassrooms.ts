import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTeacherFieldToClassrooms1612726375355
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'classrooms',
      new TableColumn({
        name: 'teacher_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'classrooms',
      new TableForeignKey({
        name: 'ClassroomsTeacher',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classrooms', 'ClassroomsTeacher');

    await queryRunner.dropColumn('classrooms', 'teacher_id');
  }
}
