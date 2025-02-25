/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@playitforward/ngx-auth';
import { I18nService } from '@playitforward/ngx-i18n';
import { LoggerService } from '@playitforward/ngx-logger';
import { fadeAnimations, routeAnimations } from '@playitforward/ngx-shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LayoutService } from './layout.service';

@Component({
  selector: 'playitforward-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimations.slideIn, fadeAnimations.fadeOutInSlow],
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sideMenu')
  private sideMenu: MatSidenav;
  @ViewChild('notifyMenu')
  private notifyMenu: MatSidenav;
  private destroy$ = new Subject<boolean>();
  hideNavbar = false;
  allowScroll = true;

  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    readonly logger: LoggerService,
    readonly i18n: I18nService,
    readonly auth: AuthService,
    readonly layout: LayoutService
  ) {}

  ngAfterViewInit(): void {
    this.layout.stateSub$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (state.menuOpen) {
        this.sideMenu.open();
      } else {
        this.sideMenu.close();
      }
      if (state.notifyOpen) {
        this.notifyMenu.open();
      } else {
        this.notifyMenu.close();
      }
    });

    this.sideMenu.closedStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.layout.state.menuOpen) {
        this.layout.toggleMenu();
      }
    });

    this.notifyMenu.closedStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.layout.state.notifyOpen) {
        this.layout.toggleNotification();
      }
    });
  }

  routeState(outlet: RouterOutlet) {
    const animationsEnabled = false;
    if (animationsEnabled) {
      return outlet.activatedRouteData.title || 'unknown';
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.logger.debug('LayoutComponent destroyed ...');
  }
}
