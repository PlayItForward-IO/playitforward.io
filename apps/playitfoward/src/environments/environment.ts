/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { AuthConfig } from '@playitfoward/ngx-auth';
import { CachifyConfig } from '@playitfoward/ngx-cachify';
import { ApplicationConfig } from '@playitfoward/ngx-config';
import { GqlConfig } from '@playitfoward/ngx-gql';
import { GTagConfig } from '@playitfoward/ngx-gtag';
import { I18nConfig } from '@playitfoward/ngx-i18n';
import { LogLevel, LoggerConfig } from '@playitfoward/ngx-logger';
import { StoreConfig } from '@playitfoward/ngx-store';
import { UserConfig } from '@playitfoward/ngx-user';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

const logger: LoggerConfig = {
  level: LogLevel.debug,
} as const;

const gql: GqlConfig = {
  endpoint: 'http://localhost:4201/graphql',
} as const;

const gtag: GTagConfig = {
  trackingId: 'U-something',
  isEnabled: false,
} as const;

const i18n: I18nConfig = {
  availableLanguages: {
    en: {
      name: 'English',
      locale: '@angular/common/locales/en',
      localeExtra: '@angular/common/locales/extra/en',
    },
    fr: {
      name: 'Français',
      locale: '@angular/common/locales/fr',
      localeExtra: '@angular/common/locales/extra/fr',
    },
    de: {
      name: 'Deutsch',
      locale: '@angular/common/locales/de',
      localeExtra: '@angular/common/locales/extra/de',
    },
    es: {
      name: 'Español',
      locale: '@angular/common/locales/es',
      localeExtra: '@angular/common/locales/extra/es',
    },
    he: {
      name: 'עִברִית',
      locale: '@angular/common/locales/he',
      localeExtra: '@angular/common/locales/extra/he',
    },
    fa: {
      name: 'پارسی',
      locale: '@angular/common/locales/fa',
      localeExtra: '@angular/common/locales/extra/fa',
    },
    'zh-hans': {
      name: '中文 - 简体',
      locale: '@angular/common/locales/zh-Hans',
      localeExtra: '@angular/common/locales/extra/zh-Hans',
    },
  },
  enabledLanguages: [
    // order is important
    'en',
    'fr',
    'zh-hans',
    'de',
    'es',
    'he',
    'fa',
  ],
  cacheBustingHash: 'v0.0.1',
};

const auth: AuthConfig = {
  logState: true,
} as const;

const user: UserConfig = {
  logState: true,
} as const;

const store: StoreConfig = {
  // we want to explicitly set it to true, if we use it at app-level
  immutable: true,
} as const;

const cachify: CachifyConfig = {
  disabled: false,
  immutable: false, // mainly caches responses, so set to false
  ttl: 30, // 30 seconds
} as const;

export const environment: Readonly<ApplicationConfig> = {
  version: '0.0.1',
  production: false,
  appName: 'PlayItForward',
  logger,
  i18n,
  gql,
  gtag,
  auth,
  user,
  store,
  cachify,
};
