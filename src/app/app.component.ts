import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'sensat-demo-app';
  public year: number;

  public ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
