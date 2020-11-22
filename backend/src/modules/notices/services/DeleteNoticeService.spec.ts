import AppError from '@shared/errors/AppError';

// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import DeleteNoticeService from './DeleteNoticeService';

let fakeNoticesRepository: FakeNoticesRepository;
let deleteNotice: DeleteNoticeService;

describe('DeleteNotice', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    deleteNotice = new DeleteNoticeService(fakeNoticesRepository);
  });

  it('should be able to delete a notice by ID', async () => {
    const notice = await fakeNoticesRepository.create({
      title: 'Notice 01',
      notice: 'Notice description',
      all: false,
      classroom_id: 'classroom_id',
    });

    await expect(
      deleteNotice.execute({ notice_id: notice.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a notice on non existing id', async () => {
    await expect(
      deleteNotice.execute({
        notice_id: 'non-existing-notice',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
