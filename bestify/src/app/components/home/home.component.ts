import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin: boolean = sessionStorage.getItem('user') ? true : false;
  scrollTo: any = '';
  gamestarted: boolean = false;
  quizpage: boolean = false;
  @Input() contactUs: boolean;
  constructor(private myElement: ElementRef) {}

  ngOnInit(): void {}

  updateScroll(e: any) {
    this.scrollTo = e;
   
    this.gotoComponent(this.scrollTo);
    
  }
  gotoComponent(id: string) {
   

    let el = this.myElement.nativeElement.querySelector('#' + id);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  gamestatus(e: any) {
    this.gamestarted = e;
   
  }

  hideComponent(event) {
    this.quizpage = event;
  }
}
