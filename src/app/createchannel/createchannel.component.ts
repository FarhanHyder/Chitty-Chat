import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/createchat.model';
import { ChatroomService } from '../services/chatroom.service';
import { stringify } from 'querystring';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.scss']
})
export class CreateChannelComponent implements OnInit {


  constructor(
    public userService: UserInfoService,
    public chatroomService: ChatroomService,

    @Optional() public dialogRef: MatDialogRef<CreateChannelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

   // tslint:disable-next-line: member-ordering
   any: string[];
   status: string;
   roomname: string;
   userList: string[];
   ownerID: string;

    ngOnInit() {
   }

  sendToFirebase(): void {
    this.chatroomService.addNewChatroom('public', this.roomname, [], this.data.ownerID)
    .then((result: any) => {
      this.data.getChatroomList();
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
