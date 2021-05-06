import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("ChatApplicationComponent");
  }

}
