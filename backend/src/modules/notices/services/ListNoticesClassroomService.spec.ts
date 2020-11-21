// fakes
import FakeNoticesRepository from '@modules/notices/repositories/fakes/FakeNoticesRepository';

// service
import ListNoticesServiceClassroom from './ListNoticesClassroomService';

let fakeNoticesRepository: FakeNoticesRepository;
let listNotices: ListNoticesServiceClassroom;

describe('ListNoticesClassroom', () => {
  beforeEach(() => {
    fakeNoticesRepository = new FakeNoticesRepository();
    listNotices = new ListNoticesServiceClassroom(fakeNoticesRepository);
  });

  it('should be able to list a notice by classroom ID', async () => {
    const notice_01 = await fakeNoticesRepository.create({
      title: 'Noticia 01',
      notice: 'Notice Description',
      all: false,
      classroom_id: 'classroom_01',
    });

    const notice_02 = await fakeNoticesRepository.create({
      title: 'Noticia 02',
      notice: 'Notice Description',
      all: false,
      classroom_id: 'classroom_01',
    });

    await fakeNoticesRepository.create({
      title: 'Noticia 03',
      notice: 'Notice Description',
      all: false,
      classroom_id: 'classroom_02',
    });

    const notices = await listNotices.execute({ classroom_id: 'classroom_01' });

    expect(notices).toEqual(expect.arrayContaining([notice_01, notice_02]));
    expect(notices).toHaveLength(2);
  });
});
