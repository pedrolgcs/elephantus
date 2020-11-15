// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import CreateNoticeService from './CreateNoticeService';

let createNotice: CreateNoticeService;
let fakeNoticesRepository: FakeNoticesRepository;

describe('CreateNotice', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    createNotice = new CreateNoticeService(fakeNoticesRepository);
  });

  it('should be able to create a new notice', async () => {
    const notice = await createNotice.execute({
      title: 'Notice Title',
      notice: 'Notice text',
      all: false,
      classroom_id: 'classroom_id',
    });

    expect(notice).toHaveProperty('id');
  });

  it('should be able to create a new notice without classroom', async () => {
    const notice = await createNotice.execute({
      title: 'Notice Title',
      all: false,
      notice: 'Notice text',
    });

    expect(notice).toHaveProperty('id');
  });
});
