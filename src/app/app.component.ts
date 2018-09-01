import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lex: AWS.LexRuntime;
  boxUserId = 'chatbox-lex' + Date.now();
  input = '';
  sessionAttributes: any = {};
  messages: Message[] = [];
  form: FormGroup;
  placeholder = 'I have an amazing app idea';

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      message: this.fb.control('')
    });
  }

  ngOnInit() {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:faef712c-14c6-4493-b3d7-3e3bd631bf03'
    });
    this.lex = new AWS.LexRuntime();
  }

  chat(message: string) {
    this.placeholder = '';
    this.form.patchValue({ message: '' });
    this.messages.push({ local: true, message });
    this.lex.postText(
      {
        botAlias: '$LATEST',
        botName: 'ProductOrdering',
        inputText: message,
        userId: this.boxUserId,
        sessionAttributes: this.sessionAttributes
      },
      (err, data) => {
        if (data) {
          this.sessionAttributes = data.sessionAttributes;
          this.messages.push({ local: false, message: data.message });
        }
      }
    );
  }
}

interface Message {
  local: boolean;
  message: string;
}
