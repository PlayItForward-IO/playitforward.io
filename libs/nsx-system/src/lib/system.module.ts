/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { I18nModule } from '@playitfoward/nsx-i18n';
import { MailerModule } from '@playitfoward/nsx-mailer';
import { PrismaModule } from '@playitfoward/nsx-prisma';
import { Module } from '@nestjs/common';

import { SystemController } from './system.controller';
import { SystemResolver } from './system.resolver';
import { SystemService } from './system.service';

@Module({
  imports: [PrismaModule, I18nModule, MailerModule],
  controllers: [SystemController],
  providers: [SystemService, SystemResolver],
  exports: [SystemService, SystemResolver],
})
export class SystemModule {}
