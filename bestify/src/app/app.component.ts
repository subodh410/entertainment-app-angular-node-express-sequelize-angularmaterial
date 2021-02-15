import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isClicked: boolean;
  isThemeChange: boolean = false;
  scrollTo: any = '';
  isprofileclicked: boolean = false;

  adminpage: boolean = sessionStorage.getItem('admin') ? true : false;
  contactUs: boolean = false;
  constructor(private myElement: ElementRef) {}
  updateTheme(e: any) {
    this.isThemeChange = e;
    console.log('app ' + this.isThemeChange);
  }

  updateScroll(e: any) {
    this.scrollTo = e;

    this.gotoComponent(this.scrollTo);
    console.log(this.scrollTo);
  }

  gotoComponent(id: string) {
    console.log(id);

    let el = this.myElement.nativeElement.querySelector('#' + id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  changeview(e: any) {
    this.isprofileclicked = e;
  }
  adminview(e: any) {
    this.adminpage = e;
  }
  hideComponent(event) {
    this.isClicked = event;
  }
  contactus(e) {
    this.contactUs = e;
  }
}
