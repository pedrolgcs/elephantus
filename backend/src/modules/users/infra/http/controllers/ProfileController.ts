import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ShowProfileService from '@modules/users/services/users/ShowProfileService';
import UpdateProfileService from '@modules/users/services/users/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id: request.user.id });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, old_password, password } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id: request.user.id,
      name,
      phone,
      email,
      old_password,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default ProfileController;
