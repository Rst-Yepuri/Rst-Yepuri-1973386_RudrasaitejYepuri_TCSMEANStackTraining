import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Question } from './model/question.model';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http:HttpClient) { }
  loadQuestions(){
    return this.http.get<Question[]>("http://localhost:3000/questions");
  }
}
