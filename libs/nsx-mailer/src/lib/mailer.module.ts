/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { Module } from '@nestjs/common';
import { I18nModule } from '@playitforward/nsx-i18n';

import { MailerService } from './mailer.service';

@Module({
  imports: [I18nModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
