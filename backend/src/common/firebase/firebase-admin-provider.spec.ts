import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAdminProvider } from './firebase-admin.service';

describe('FirebaseAdminProvider', () => {
  let provider: FirebaseAdminProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseAdminProvider],
    }).compile();

    provider = module.get<FirebaseAdminProvider>(FirebaseAdminProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
