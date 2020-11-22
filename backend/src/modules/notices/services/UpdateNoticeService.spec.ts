import AppError from '@shared/errors/AppError';

// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import UpdateNoticeService from './UpdateNoticeService';

let fakeNoticesRepository: FakeNoticesRepository;
let updateNotice: UpdateNoticeService;

describe('UpdateNotice', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    updateNotice = new UpdateNoticeService(fakeNoticesRepository);
  });

  it('should be able update a notice by ID', async () => {
    const notice_01 = await fakeNoticesRepository.create({
      title: 'Notice 01',
      notice: 'Notice description',
      all: false,
      classroom_id: 'classroom_id',
    });

    await updateNotice.execute({
      notice_id: notice_01.id,
      title: 'Notice 01 updated',
      notice: 'Notice description updated',
    });

    expect(notice_01.title).toBe('Notice 01 updated');
    expect(notice_01.notice).toBe('Notice description updated');
  });

  it('should not be able to update a notice with non existing id', async () => {
    await expect(
      updateNotice.execute({
        notice_id: 'non-existing-notice',
        title: 'New Title',
        notice: 'New description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
