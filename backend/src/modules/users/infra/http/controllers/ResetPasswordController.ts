import { Request, Response } from 'express';
import { container } from 'tsyringe';

// service
import ResetPasswordService from '@modules/users/services/users/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { user_id } = request.params;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      user_id,
      password,
    });

    return response.status(204).send();
  }
}

export default ResetPasswordController;
