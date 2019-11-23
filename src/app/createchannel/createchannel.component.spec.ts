import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelComponent } from './createchannel.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material-module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('CreateChannelComponent', () => {
  let component: CreateChannelComponent;
  let fixture: ComponentFixture<CreateChannelComponent>;

  describe('CreateChannelComponent', () => {
    const mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    const mockData = {
      chatroomName: 'mock name',
      userID: 'mock user'
    };

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ CreateChannelComponent, ChatboxComponent ],
      providers: [
        ChatService, AuthService, AngularFireAuth, AngularFirestore,
        { provide: MatDialogRef,
          useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA,
          useValue: { mockData }
        }
      ]
    })
    .compileComponents();
  }));

    beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    it('#onNoClick should close the dialog', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
