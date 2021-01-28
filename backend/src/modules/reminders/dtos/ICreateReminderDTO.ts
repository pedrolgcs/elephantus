import { Days } from '../infra/typeorm/entities/Reminder';

export default interface ICreateReminderDTO {
  title: string;
  description?: string;
  day: Days;
  classroom_id: string;
}
