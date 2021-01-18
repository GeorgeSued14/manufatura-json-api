import { Component } from '@angular/core';

import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User;
  text: Object = { message: '' };

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    this.text = this.accountService
      .index()
      .subscribe((message) => (this.text = message));
  }
}
