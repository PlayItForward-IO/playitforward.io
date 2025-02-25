/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { HttpContextToken } from '@angular/common/http';

import { CachifyConfig, CachifyContextMeta, CachifyFetchPolicy } from './cachify.model';

/**
 * Max cache is one month
 */
export const DefaultMaxCacheExpiry = 60 * 60 * 24 * 30;

/**
 * Default configuration - Cachify module
 */
export const DefaultCachifyConfig: CachifyConfig = {
  // by default cache is disabled
  disabled: true,

  // freeze state
  immutable: true,

  // by default, expiry time of http cache is 60 seconds
  ttl: DefaultMaxCacheExpiry,
};

/**
 * Enabled fetch policy
 */
export const DefaultFetchPolicies = [
  CachifyFetchPolicy.CacheOff,
  CachifyFetchPolicy.CacheFirst,
  CachifyFetchPolicy.CacheOnly,
  CachifyFetchPolicy.NetworkOnly,
  CachifyFetchPolicy.NetworkFirst,
  CachifyFetchPolicy.CacheAndNetwork,
];

/**
 * Default fetch policy
 */
export const DefaultFetchPolicy = CachifyFetchPolicy.CacheFirst;

/**
 * Default cache context meta data
 */
export const DefaultContextMeta: CachifyContextMeta = {
  key: null,
  ttl: DefaultMaxCacheExpiry,
  policy: DefaultFetchPolicy,
};

/**
 * Cache context token
 */
export const CACHIFY_CONTEXT_TOKEN = new HttpContextToken<CachifyContextMeta>(
  () => DefaultContextMeta
);
