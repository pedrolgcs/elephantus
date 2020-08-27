import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ShowProfileService from '@modules/users/services/users/ShowProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id: request.user.id });

    return response.status(200).json(classToClass(user));
  }
}

export default ProfileController;
