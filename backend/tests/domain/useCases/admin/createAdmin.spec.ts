import { CreateAdmin, setupCreateAdmin } from '@/domain/useCases';
import { AdminRepository, Bcrypt } from '@/domain/contracts';
import { DataAlreadyExistsError } from '@/domain/entities';

import { mock, MockProxy } from 'jest-mock-extended';

describe('', () => {
  let adminRepo: MockProxy<AdminRepository>;
  let bcrypt: MockProxy<Bcrypt>;
});
