export default interface ICreateUserDTO {
  name: string;
  phone?: string;
  email: string;
  password: string;
  role_id?: string;
}
