import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss'],
})
export class PagenotfoundComponent implements OnInit {
  @Output() ispagenotfound = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  toHome() {
    this.router.navigate(['']);
    this.ispagenotfound.emit(true);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
