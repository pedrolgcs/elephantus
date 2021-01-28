import IOutputsChannelDTO from '@modules/reminders/dtos/ICreateReminderDTO';
import { Days } from '@modules/reminders/infra/typeorm/entities/Reminder';

interface IReminderDTO extends IOutputsChannelDTO {
  id: string;
}

class ReminderBuilder {
  private reminderData: IReminderDTO;

  constructor(id: string) {
    this.reminderData = {
      id,
      day: 'Mon',
      title: 'any_title',
      description: 'any_description',
      classroom_id: 'any_classroom_id',
    };
  }

  public setTitle(title: string) {
    this.reminderData.title = title;
    return this;
  }

  public setDescription(description: string) {
    this.reminderData.description = description;
    return this;
  }

  public setClassroomId(id: string) {
    this.reminderData.classroom_id = id;
    return this;
  }

  public setDay(day: Days) {
    this.reminderData.day = day;
    return this;
  }

  public build() {
    return this.reminderData;
  }
}

export default ReminderBuilder;
