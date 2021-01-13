import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
