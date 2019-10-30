import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/map';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  text: string;
  selectedConversation = {
    members: [
      {
        value: {
          user: {
            name: 'John'
          }
        }
      }
    ]
  };
  conversations = [
    {
      id: 1,
      display_name: 'Luke',
      message: ['message1']
    }
  ];
  constructor() {}

  ngOnInit() {}

  selectConversation(id) {}
  sendText(text) { console.log(this.text); }
}
