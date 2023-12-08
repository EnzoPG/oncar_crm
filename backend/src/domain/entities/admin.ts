type TypeAdmin = {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export class Admin {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  constructor({ _id, email, password, createdAt, updatedAt, deletedAt }: TypeAdmin) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
