import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { CheckloginComponent } from '../checklogin/checklogin.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-gamesection',
  templateUrl: './gamesection.component.html',
  styleUrls: ['./gamesection.component.scss'],
})
export class GamesectionComponent implements OnInit {
  @Output() isgamestart = new EventEmitter<boolean>();
  gamestarted: boolean = false;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}
  startgame(path) {
    if (sessionStorage.getItem('user')) {
      // this.gamestarted = true;
      this.isgamestart.emit(true);

      this.router.navigate([`${path}`]);
    } else {
      this.openLoginDialog();
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(CheckloginComponent, {
      //  panelClass:'login-dialog-container'
      width: '200px',
    });
  }
}
