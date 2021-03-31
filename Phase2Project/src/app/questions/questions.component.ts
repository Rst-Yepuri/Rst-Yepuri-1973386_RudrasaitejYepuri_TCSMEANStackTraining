import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions:Array<Question>=[];
  result:boolean = true;
  score:number = 0;
  percentage:number = 0;
  msg:string ="";
  constructor(public qServ: QuizService, public router: Router) { }
  map = new Map();
  ngOnInit(): void {
    this.qServ.loadQuestions().subscribe(result=>this.questions=result,
      error=>console.log(error))  
  }

  checkAnswers(){
    for (let key of this.map.keys()) {  
      if(this.questions.find(x => x.questionId == key)?.answer == this.map.get(key)){
        this.score++;
      }   
    }
    if(this.score>=7){
      this.msg = "Congralations, you passed in this test with"+ this.score*10+"%.";
    }else{
      this.msg ="Sorry, you got "+ this.score*10+"% in this test.";
    }

    this.result = false;
  }
  getColor(){
    if(this.score>5){
      return "green";
    }
    return "red";
  }
  recordAnswers(questionId:number,answer:string){
    this.map.set(questionId,answer);
    console.log(this.map);
  }
}
