import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  previousUser: string = '';
  chatSubscription!: Subscription;
  messagesReceived: Array<any> = [];
  messagesOutput: Array<MessageOutputInterface> = [];
  @ViewChild('scrollBottom') scrollBottom: ElementRef | undefined;

  constructor(private afDb: AngularFirestore) {}

  ngOnInit(): void {
    this.chatSubscription = this.afDb
      .collection('chats')
      .doc('5fb79f9e2f87b9dac9b0882b48')
      .collection('messages')
      .valueChanges()
      .subscribe((col: any[]) => {
        this.messagesReceived = [];
        this.messagesOutput = [];
        col.forEach((doc: any) => {
          var payload: MessageInterface = {
            message: doc.message,
            uid: doc.uid,
            userName: doc.name,
            date: doc.date.toDate(),
          };

          this.messagesReceived.push(payload);
          // console.log(payload);
        });
        this.messagesReceived.sort((a, b) => {
          if (a.date.valueOf() < b.date.valueOf()) return -1;
          else if (a.date.valueOf() > b.date.valueOf()) return 1;
          else return 0;
        });

        var previousUser: any = this.messagesReceived[0];
        let msg: string[] = [];

        for (let item of this.messagesReceived.keys()) {
          var user = this.messagesReceived[item];
          if (user['userName'] != previousUser['userName']) {
            var sortedMsg: MessageOutputInterface = {
              messages: msg,
              date: previousUser['date'],
              userName: previousUser['userName'],
            };
            this.messagesOutput.push(sortedMsg);
            msg = [];
          }
          msg.push(user['message']);
          previousUser = user;
        }
        var sortedMsg: MessageOutputInterface = {
          messages: msg,
          date: previousUser['date'],
          userName: previousUser['userName'],
        };
        this.messagesOutput.push(sortedMsg);

        console.log(this.messagesOutput);
      });

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom!.nativeElement.scrollTop =
        this.scrollBottom!.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
}

interface MessageInterface {
  message: string;
  date: Date;
  uid: string;
  userName: string;
}
interface MessageOutputInterface {
  messages: string[];
  date: Date;
  userName: string;
}

// prevItem = ""
// for item in list:
//   if prevItem == item:
//     (some stuff)
//   prevItem = item
