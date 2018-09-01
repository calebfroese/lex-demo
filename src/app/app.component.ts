import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lex: LexRuntime;
  response = '';
  input = '';

  ngOnInit() {
    this.lex = new LexRuntime();
  }
}
