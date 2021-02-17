import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListRemindersByClassroomService from '@modules/reminders/services/ListRemindersByClassroomService';
import CreateReminderService from '@modules/reminders/services/CreateReminderService';
import UpdateReminderService from '@modules/reminders/services/UpdateReminderService';
import DeleteReminderService from '@modules/reminders/services/DeleteReminderService';

class RemindersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { classroom_id } = request.params;

    const listReminders = container.resolve(ListRemindersByClassroomService);

    const remidners = await listReminders.execute({ classroom_id });

    return response.status(200).json(remidners);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, day, classroom_id } = request.body;

    const createReminder = container.resolve(CreateReminderService);

    const newReminder = await createReminder.execute({
      title,
      description,
      day,
      classroom_id,
    });

    return response.status(201).json(newReminder);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { reminder_id } = request.params;
    const { title, description } = request.body;

    const updateReminder = container.resolve(UpdateReminderService);

    const updatedReminder = await updateReminder.execute({
      reminder_id,
      title,
      description,
    });

    return response.status(201).json(updatedReminder);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { reminder_id } = request.params;

    const deleteNotice = container.resolve(DeleteReminderService);

    await deleteNotice.execute({ reminder_id });

    return response.status(204).send();
  }
}

export default RemindersController;
