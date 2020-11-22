import AppError from '@shared/errors/AppError';

// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import ShowNoticeService from './ShowNoticeService';

let fakeNoticesRepository: FakeNoticesRepository;
let showNotice: ShowNoticeService;

describe('ShowNotice', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    showNotice = new ShowNoticeService(fakeNoticesRepository);
  });

  it('should be able to show a notice', async () => {
    const notice = await fakeNoticesRepository.create({
      title: 'Notice 01',
      notice: 'Notice description',
      all: false,
      classroom_id: 'classroom_id',
    });

    const read = await showNotice.execute({ notice_id: notice.id });

    expect(read.title).toBe('Notice 01');
  });

  it('should not be able to show a notice with non existing id', async () => {
    await expect(
      showNotice.execute({
        notice_id: 'non-existing-notice',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
