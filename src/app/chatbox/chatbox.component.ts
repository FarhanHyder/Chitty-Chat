import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { User } from 'src/app/login/users';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/map';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  currentUser: User;
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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  selectConversation(id) {}
  sendText(text) { console.log(this.text); }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
}
}
