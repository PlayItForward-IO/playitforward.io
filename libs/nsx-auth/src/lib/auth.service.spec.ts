/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@playitforward/nsx-prisma';
import { getMockPrismaService } from '@playitforward/nsx-prisma/mock';

import { SecurityService } from './auth.security.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfigService,
        { provide: PrismaService, useValue: getMockPrismaService() },
        SecurityService,
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  afterAll(() => {
    service = null;
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
