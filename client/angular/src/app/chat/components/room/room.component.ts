import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  name: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(e => {
        const navigation = this.router.getCurrentNavigation();
        console.log({ navigation });
      });
  }

  comments: Comment[] = [
    {
      id: '1',
      name: 'hoge',
      content: 'こんにちは',
      createAt: new Date().toISOString(),
    },
  ];

  ngOnInit(): void {}
}

export interface Comment {
  id: string;
  name: string;
  content: string;
  createAt: string;
}
