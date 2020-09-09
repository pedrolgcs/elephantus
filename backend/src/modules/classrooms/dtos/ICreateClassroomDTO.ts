export default interface ICreateClassroomDTO {
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  user_id: string;
}
