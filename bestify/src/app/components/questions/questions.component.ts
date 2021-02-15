import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import {HttpClient} from '@angular/common/http';
import { QuizlistService } from '../display-quiz/display-quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  QuizId:any={};
  QuizResult:any;
  totalQuestionsResult:any;
  totalQuestions:number;
  category:any;
  constructor(private router: Router,private _Activatedroute:ActivatedRoute,private http:HttpClient) {
    this._Activatedroute.params.subscribe(params=>
      this.QuizId = params.QuizId);
   
      
      this.http.get(`http://localhost:8080/api/quiz/quizid/`+this.QuizId).subscribe((result)=>{
      this.QuizResult = result;
     
      
    
      this.http.get(`http://localhost:8080/api/questions?QuizId=`+this.QuizId).subscribe((result:any)=>{
        this.totalQuestionsResult = result;
        this.totalQuestions= result.length;
      
        
      });
  
      
     
      
    });
   }
  
  ngOnInit(): void {
    
    this.category = this._Activatedroute.snapshot.params['category'];
  
  }


  startQuiz(){
   
      this.router.navigateByUrl("Quiz/"+this.QuizId+"/question/1");
  }
  
}

