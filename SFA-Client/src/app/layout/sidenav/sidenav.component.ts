import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';
import { AuthService } from '@app/_services/auth.service';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  username = '';
  sidenavUserVisible$ = this.themeService.config$.pipe(
    map((config) => config.sidenavUserVisible)
  );

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private authenticationService: AuthService
  ) {
    this.username = this.authenticationService.currentUserValue.displayName;
    this.addNavItems();
  }

  ngOnInit() {
    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) =>
        this.sidenavService.sortRecursive(items, 'position')
      )
    );
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {}

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
    ]);
  }
}
