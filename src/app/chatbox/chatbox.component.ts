import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessageService } from '../services/message.service';
import { UserInfoService } from '../services/user-info.service';
import { ChatroomService } from '../services/chatroom.service';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';
import { DialogData } from 'src/app/models/createchat.model';
import { UserInfo } from 'firebase';
import { Chatuser } from '../models/chatuser.model';
import { CreateChannelComponent } from '../createchannel/createchannel.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  // chatroomName: string;
  // userID: string;
  @Input() userInfo: User;
  selectedChatRoomID = 'UgQEVNxekZrld8UJqtkZ';
  chatroomSubscription: Subscription;
  selectedName: string;
  text: string;
  message = '';
  messages: string[] = [];
  secretCode = 'secret';
  friendListId = [];
  status: string;
  roomname: string;
  userList: string[];
  ownerID: string;
  conversationsListId = [
    '05kbCceCnYxcfOxewCJK',
    'UgQEVNxekZrld8UJqtkZ',
    'e0cGp5IpWGb9AuC3iuM2',
    'ji9ldKigbHxBadcZyb1E'
  ];
  selectedConversation = {
    name: ''
  };
  conversations = [];

  //  Stores all available chatrooms to the user
  chatroomList = [];

  friendList = [
    {
      id: 'SyFrC5N7QlUNyia8aJWqWySdDFx1',
      name: 'Random'
    },
    {
      id: 'l9A3All48lZkGjNhnOkTfF0JREg1',
      name: 'General'
    },
    {
      id: 'yKoayuA5IIb32BUkKvYvWOk6xx13',
      name: 'ChittyC'
    }
  ];

  events = [
    {
      from: '1',
      type: 'text',
      text: 'mesages'
    },
    {
      from: '2',
      type: 'text',
      text: 'messages'
    }
  ];
  constructor(
    private chatService: ChatService,
    public auth: AuthService,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private userInfoService: UserInfoService,
    private chatRoomService: ChatroomService
  ) { }

  ngOnInit() {
    this.getChatroomList()
      .then(() => {
        if (this.chatroomList.length) {
          this.openConversation(0);
        }
      });
    console.log(this.userInfo);
  }

  updateChatHistory() {
    this.events = [];
    this.chatroomSubscription = this.chatRoomService
      .getUpdates(this.selectedChatRoomID)
      .subscribe((message: any) => {
        console.log(message);
        message.forEach((element: Chat) => {
          this.events.push({
            from: element.user,
            type: 'text',
            text: element.content
          });
          console.log(this.events);
        });
      });
  }

  getFriendList() {
    this.friendListId = this.userInfo ? this.userInfo.friendList : [];
    console.log(this.friendList);
    this.friendListId.forEach(friendID => {
      this.userInfoService
        .getCurrentUserInfo(friendID)
        .subscribe((res: any) => {
          console.log(res.payload.data());
          this.friendList.push({
            id: res.payload.data().uid,
            name: res.payload.data().displayName.substring(0, 7)
          });
          console.log(this.friendList);
        });
    });
  }

  getConversations() {
    this.conversationsListId = this.userInfo ? this.userInfo.chatrooms : [];
  }

  selectConversation(id: string, index: number) {
    const result = this.conversations.filter(
      conversation => conversation.id === id
    );
    this.openConversation(index);
  }

  openConversation(index: number) {
    if (this.chatroomSubscription) {
      this.chatroomSubscription.unsubscribe();
    }
    this.selectedConversation.name = this.chatroomList[index].name;
    this.selectedChatRoomID = this.chatroomList[index].id;
    this.updateChatHistory();
  }

  deleteConversation(id: string) {
    const deleteIndex = this.conversations.findIndex(item => item.id === id);
    this.conversations.splice(deleteIndex, 1);
  }
  sendMsgToFirebase(message: string) {
    const date = new Date();
    this.messageService.sendMessage(
      this.userInfo.uid,
      date,
      this.selectedChatRoomID,
      message
    );
  }

  sendMessage(message: string) {
    if (this.message !== '') {
      this.sendMsgToFirebase(message);
      this.message = '';
      const objDiv = document.getElementById('content');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '2000px',
      data: {
        ownerID: this.userInfo.uid,
        getChatroomList: this.getChatroomList.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.roomname = result;
      console.log(result);
    });
  }

  //  Retrieves the user's chatrooms and stores them in this.chatroomList
  getChatroomList(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.chatroomList = [];
      const availableChatrooms = this.chatroomList;
      this.userInfoService.getCurrentUserInfo(this.userInfo.uid)
        .subscribe({
          next(data: any) {
            const chatroomRefs = data.payload.data().chatroomRefs;
            if (chatroomRefs.length > 0) {
              chatroomRefs.forEach((item, index, arr) => {
                item.get().then((chatroom) => {
                  const chatroomData = chatroom.data();
                  availableChatrooms.push({
                    id: item.id,
                    name: chatroomData.roomName
                  });

                  if (index === arr.length - 1) {
                    resolve();
                  }
                });
              });
            } else {
              reject(new Error());
            }
          }
        });
    });
  }
}
