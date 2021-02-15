import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QuizlistService } from './display-quiz.service';

describe('DisplayQuizService', () => {
  let service: QuizlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
    ],
      providers: [QuizlistService]
    });
    service = TestBed.inject(QuizlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
