/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { AuthService, DefaultAuthConfig } from '@playitforward/ngx-auth';
import {
  ApplicationConfig,
  ConfigService,
  DefaultApplicationConfig,
} from '@playitforward/ngx-config';
import { GqlErrorsHandler, GqlService } from '@playitforward/ngx-gql';
import { SystemContactUsMutation } from '@playitforward/ngx-gql/operations';
import { SystemContactUsInput, SystemStatus } from '@playitforward/ngx-gql/schema';
import { I18nService, i18nExtractor as _ } from '@playitforward/ngx-i18n';
import { LogLevel, LoggerService } from '@playitforward/ngx-logger';
import { MsgService } from '@playitforward/ngx-msg';
import { merge as ldNestedMerge } from 'lodash-es';
import { Observable, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { DeepReadonly } from 'ts-essentials';

@Injectable({
  providedIn: 'root',
})
export class SystemService implements OnDestroy {
  private nameSpace = 'SYSTEM';
  private destroy$ = new Subject<boolean>();
  options: DeepReadonly<ApplicationConfig> = DefaultApplicationConfig;
  routeData: Data;

  constructor(
    readonly router: Router,
    readonly activatedRoute: ActivatedRoute,
    readonly title: Title,
    readonly meta: Meta,
    readonly config: ConfigService,
    readonly msg: MsgService,
    readonly gql: GqlService,
    readonly gtag: GqlService,
    readonly logger: LoggerService,
    readonly i18n: I18nService,
    readonly auth: AuthService
  ) {
    this.msg.reset();
    this.options = ldNestedMerge({ auth: DefaultAuthConfig }, this.config.options);
    this.enableRouteDataUpdates();
  }

  private enableRouteDataUpdates() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.activatedRoute?.firstChild?.data),
        filter((data) => Object.keys(data).length > 0),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.routeData = { ...data };
          this.setPageTitle(data);
          this.setPageDescription(data);
        },
      });

    this.i18n.stateChange$
      .pipe(
        filter(() => Object.keys(this.routeData).length > 0),
        map(() => this.routeData),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.routeData = { ...data };
        this.setPageTitle(data);
        this.setPageDescription(data);
      });
  }

  private setPageTitle(data: Data) {
    const appName = this.options?.appName;
    this.i18n.translate
      .get(data?.title)
      .pipe(take(1))
      .subscribe((translatedTitle) => {
        let newTitle = translatedTitle;
        if (translatedTitle !== appName) {
          newTitle = `${appName} | ${translatedTitle}`;
        }
        this.title.setTitle(newTitle);
      });
  }

  private setPageDescription(data: Data) {
    this.i18n.translate
      .get(data?.title)
      .pipe(take(1))
      .subscribe((translatedTitle) => {
        this.meta.updateTag({ name: 'description', content: translatedTitle });
      });
  }

  systemContactUsMutate$(input: SystemContactUsInput): Observable<SystemStatus> {
    this.msg.reset();
    this.logger.debug(`[${this.nameSpace}] Contact message sent ...`);

    return this.gql.client.request<SystemStatus>(SystemContactUsMutation, { input }).pipe(
      map((resp) => {
        if (resp.ok) {
          this.logger.debug(`[${this.nameSpace}] Contact message  success ...`);
          this.msg.setMsg({ text: _('SUCCESS.CONTACT.MESSAGE.SENT'), level: LogLevel.success });
          this.msg.successToast('INFO.CONTACT_MESSAGE_SENT', { duration: 5000 });
          return resp;
        } else {
          const message = resp?.message || _('ERROR.CONTACT.MESSAGE.SENT');
          this.logger.error(`[${this.nameSpace}] Contact message  failed ...`, message);
          this.msg.setMsg({ text: message, level: LogLevel.error });
          return { ...resp, message: resp.message || message };
        }
      }),
      catchError((err: GqlErrorsHandler) => {
        const errorMessage = err.topError?.message || _('ERROR.CONTACT.MESSAGE.SENT');
        this.logger.error(`[${this.nameSpace}] Contact message  failed ...`, err);
        this.msg.setMsg({ text: errorMessage, level: LogLevel.error });
        return of({ ok: false, message: errorMessage } as SystemStatus);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
