import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  isMCQ: boolean = false;
  QueTab: boolean = false;
  gameuserCount: any;
  quizuserCount: any;
  gameHighScoreData: any;
  quizHighScoreData: any;
  displayedColumns: string[] = ['username', 'maxscore'];
  quizarray: any[];
  dataSource1: any;
  dataSource2: any;
  dataSource3: any;
  numberofusers: any;
  quizSubmitResponse: any;
  subscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;

  constructor(
    private myElement: ElementRef,
    private _adminServ: AdminService,
    private fb: FormBuilder
  ) {
    this.quizform = this.fb.group({
      quizname: ['', Validators.required],
      quizcategory: ['', Validators.required],
    });
    this.questionform = this.fb.group({
      questionstatement: [''],
      option1: [''],
      option2: [''],
      option3: [''],
      option4: [''],
      answer: [''],
    });
  }

  quizform: FormGroup;
  questionform: FormGroup;

  pie: any = 'PieChart';
  piedata: any[];
  pietitle: any = 'pie chart';
  piecolumns: any[] = ['Games', 'Users Count'];
  pieoptions: any = {
    colors: ['#F4D03F', '#58D68D', '#5DADE2', '#E74C3C', '#8E44AD'],
    is3D: true,
  };
  piewidth: any = 600;
  pieheight: any = 600;

  column: any = 'ColumnChart';
  columndata: any[];

  columntitle: any = 'column chart';
  columncolumns: any[] = ['Quiz', 'Users Count'];
  columnoptions: any = {
    colors: ['#E74C3C', '#58D68D', '#5DADE2', '#E74C3C', '#8E44AD'],
    is3D: true,
  };
  columnwidth: any = 600;
  columnheight: any = 600;

  ngOnInit(): void {
    // this._adminServ.getUsersCount().subscribe((data) => {
    //   this.numberofusers = data[0].usercount;
    // });

    // this._adminServ.getgameusersCount().subscribe((data) => {
    //   this.gameuserCount = data;

    //   this.piedata = this.gameuserCount.map((o) =>
    //     Object.keys(o).map((k) => o[k])
    //   );
    // });

    // this._adminServ.getquizusersCount().subscribe((data) => {
    //   this.quizuserCount = data;

    //   this.columndata = this.quizuserCount.map((o) =>
    //     Object.keys(o).map((k) => o[k])
    //   );
    // });

    // this._adminServ.getUsersWithHighGameScore().subscribe((data) => {
    //   this.gameHighScoreData = data;
    //   this.dataSource1 = new MatTableDataSource(this.gameHighScoreData);

    //   this.dataSource1.sort = this.sort;
    //   this.dataSource1.paginator = this.paginator;
    // });
    // this._adminServ.getUsersWithHighQuizScore().subscribe((data) => {
    //   this.quizHighScoreData = data;
    //   this.dataSource2 = new MatTableDataSource(this.quizHighScoreData);

    //   this.dataSource2.sort = this.sort1;
    //   this.dataSource2.paginator = this.paginator1;
    // });

    // this._adminServ.getallQuiz().subscribe((data: any) => {
    //   this.quizarray = data;
    // });
    var subscription1$ = this._adminServ.getUsersCount().subscribe((data) => {
      this.numberofusers = data[0].usercount;
    });

    var subscription2$ = this._adminServ
      .getgameusersCount()
      .subscribe((data) => {
        this.gameuserCount = data;

        this.piedata = this.gameuserCount.map((o) =>
          Object.keys(o).map((k) => o[k])
        );
      });

    var subscription3$ = this._adminServ
      .getquizusersCount()
      .subscribe((data) => {
        this.quizuserCount = data;

        this.columndata = this.quizuserCount.map((o) =>
          Object.keys(o).map((k) => o[k])
        );
      });

    var subscription4$ = this._adminServ
      .getUsersWithHighGameScore()
      .subscribe((data) => {
        this.gameHighScoreData = data;
        this.dataSource1 = new MatTableDataSource(this.gameHighScoreData);

        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      });
    var subscription4$ = this._adminServ
      .getUsersWithHighQuizScore()
      .subscribe((data) => {
        this.quizHighScoreData = data;
        this.dataSource2 = new MatTableDataSource(this.quizHighScoreData);

        this.dataSource2.sort = this.sort1;
        this.dataSource2.paginator = this.paginator1;
      });

    var subscription5$ = this._adminServ.getallQuiz().subscribe((data: any) => {
      this.quizarray = data;
    });

    this.subscription?.add(subscription1$);
    this.subscription?.add(subscription2$);
    this.subscription?.add(subscription3$);
    this.subscription?.add(subscription4$);
    this.subscription?.add(subscription5$);
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  submitQuiz() {
    if (this.quizform.valid) {
      this.QueTab = true;
      let quiz = {
        quizname: this.quizform.value.quizname,
        category: this.quizform.value.quizcategory,
      };
      this._adminServ.postQuiz(quiz).subscribe((res) => {
        this.quizSubmitResponse = res;
      });
      this.quizform.reset();
      this._adminServ.getallQuiz().subscribe((data: any) => {
        this.quizarray = data;
      });
    }
  }
  submitQuetions() {
    if (this.isMCQ) {
      let questions = {
        QuestionStatement: this.questionform.value.questionstatement,
        Option1: this.questionform.value.option1,
        Option2: this.questionform.value.option2,
        Option3: this.questionform.value.option3,
        Option4: this.questionform.value.option4,
        IsMcq: true,
        Answers: this.questionform.value.answer,
        quizname: this.quizform.value.quizname,
        QuizId: this.quizSubmitResponse.id,
      };
      this._adminServ.postQuestions(questions).subscribe();
      this.questionform.reset();
    } else {
      let questions = {
        QuestionStatement: this.questionform.value.questionstatement,
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        IsMcq: false,
        Answers: this.questionform.value.answer,
        quizname: this.quizform.value.quizname,
        QuizId: this.quizSubmitResponse.id,
      };
      this._adminServ.postQuestions(questions).subscribe();
      this.questionform.reset();
    }
  }
  deleteQuiz(id: any) {
    this._adminServ.deleteQuiz(id).subscribe((res) => {});
    this._adminServ.getallQuiz().subscribe((data: any) => {
      this.quizarray = data;
    });
    this._adminServ.getquizusersCount().subscribe((data) => {
      this.quizuserCount = data;

      this.columndata = this.quizuserCount.map((o) =>
        Object.keys(o).map((k) => o[k])
      );
    });
  }

  gotoSection(id: string) {
    let el = this.myElement.nativeElement.querySelector('#' + id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
