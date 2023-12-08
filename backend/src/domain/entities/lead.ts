type TypeLead = {
  _id: string;
  idUser: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export class Lead {
  _id: string;
  idUser: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  constructor({ _id, idUser, score, createdAt, updatedAt, deletedAt }: TypeLead) {
    this._id = _id;
    this.score = score;
    this.idUser = idUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
