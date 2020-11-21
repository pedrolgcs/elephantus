// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import ListNoticesService from './ListNoticesService';

let fakeNoticesRepository: FakeNoticesRepository;
let listNotices: ListNoticesService;

describe('ListNoticesClassroom', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    listNotices = new ListNoticesService(fakeNoticesRepository);
  });

  it('should be able to list a notice by classroom ID', async () => {
    const notice_01 = await fakeNoticesRepository.create({
      title: 'Noticia 01',
      notice: 'Notice Description',
      all: true,
    });

    const notice_02 = await fakeNoticesRepository.create({
      title: 'Noticia 02',
      notice: 'Notice Description',
      all: true,
    });

    await fakeNoticesRepository.create({
      title: 'Noticia 03',
      notice: 'Notice Description',
      all: false,
      classroom_id: 'classroom_02',
    });

    const notices = await listNotices.execute();

    expect(notices).toEqual(expect.arrayContaining([notice_01, notice_02]));
    expect(notices).toHaveLength(2);
  });
});
