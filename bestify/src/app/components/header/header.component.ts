import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterdialogComponent } from '../registerdialog/registerdialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = sessionStorage.getItem('user') ? true : false;
  @Output() isContactUs = new EventEmitter<boolean>();
  isThemeChange: boolean = false;
  theme: string = 'toggle_on';
  adminLoggedIn: boolean = sessionStorage.getItem('admin') ? true : false;
  @Output() myevent = new EventEmitter<boolean>();
  @Output() userprofileclicked = new EventEmitter<boolean>();
  @Output() adminpage = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog, private router: Router) {}


  openLoginDialog() {
    const dialogRef = this.dialog.open(LogindialogComponent, {
     
      width: '300px',
      data: {
        theme: this.isThemeChange,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      if (sessionStorage.getItem('user') || sessionStorage.getItem('admin')) {
        if (result?.data[1] == 'user') {
        
          this.isLogin = result?.data;
        
        }
        if (result?.data[1] == 'admin') {
          this.adminLoggedIn = result?.data;
         
          this.adminpage.emit(true);
        }
      }
    });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterdialogComponent, {
      width: '300px',
    });
  }

  themechange() {
    if (this.isThemeChange) {
      this.isThemeChange = false;
      this.myevent.emit(this.isThemeChange);
      this.theme = 'toggle_on';
    
      return;
    }
    this.isThemeChange = true;
   
    this.theme = 'toggle_off';
    this.myevent.emit(this.isThemeChange);
  }
  ngOnInit(): void {
   
  }

  logout() {
    if (sessionStorage.getItem('admin')) {
      sessionStorage.removeItem('admin');
      this.adminLoggedIn = false;
      sessionStorage.clear();
      window.location.reload();
    }

    sessionStorage.removeItem('user');
    this.isLogin = false;
    this.router.navigate(['/']);
    sessionStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  goToProfile() {
  
    this.userprofileclicked.emit(true);
    this.router.navigate(['/userFavourite']);
  }

  toContactUs() {
    this.isContactUs.emit(true);
    this.router.navigate(['/contactus']);
  }
  toHome() {
    this.router.navigateByUrl('');
    setTimeout(() => window.location.reload(), 1);
  }
}
