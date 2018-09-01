import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lex: AWS.LexRuntime;
  response = '';
  input = '';
  sessionAttributes: any = {};

  ngOnInit() {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:faef712c-14c6-4493-b3d7-3e3bd631bf03'
    });
    this.lex = new AWS.LexRuntime();
  }

  chat(message: string) {
    this.lex.postText(
      {
        botAlias: '$LATEST',
        botName: 'ProductOrdering',
        inputText: message,
        userId: 'chatbot-lex' + Date.now(),
        sessionAttributes: this.sessionAttributes
      },
      (err, data) => {
        if (data) {
          this.sessionAttributes = data.sessionAttributes;
          console.log(this.sessionAttributes);
          this.addResponse(data);
        }
      }
    );
  }

  addResponse(response: any) {
    this.response = response.message;
  }
}
