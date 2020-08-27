import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  isOpen: boolean;
  username = '';

  constructor(private authService: AuthService) {
    this.username = this.authService.currentUserValue.displayName;
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
