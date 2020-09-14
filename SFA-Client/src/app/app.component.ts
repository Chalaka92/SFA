import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ThemeService } from '../@sfa/services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@sfa/services/splash-screen.service';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { SidenavService } from './layout/sidenav/sidenav.service';

@Component({
  selector: 'sfa-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentUser: User;

  constructor(
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService,
    private router: Router,
    private authenticationService: AuthService,
    private sidenavService: SidenavService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has('style')))
      .subscribe((queryParamMap) =>
        this.themeService.setStyle(queryParamMap.get('style'))
      );

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe((theme) => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }
    this.addNavItems();
  }

  addNavItems() {
    this.sidenavService.addItems([
      {
        name: 'APPS',
        position: 5,
        type: 'subheading',
        customClass: 'first-subheading',
      },
      {
        name: 'Dashboard',
        routeOrFunction: '/apps/dashboard',
        icon: 'dashboard',
        position: 10,
        pathMatchExact: true,
      },
      {
        name: 'Routes',
        icon: 'map',
        position: 15,
        subItems: [
          {
            name: 'Route',
            routeOrFunction: '/routes/route',
            position: 10,
          },
          {
            name: 'Area',
            routeOrFunction: '/routes/area',
            position: 15,
          },
          {
            name: 'District',
            routeOrFunction: '/routes/district',
            position: 20,
          },
          {
            name: 'Province',
            routeOrFunction: '/routes/province',
            position: 25,
          },
        ],
      },
    ]);
  }
}
