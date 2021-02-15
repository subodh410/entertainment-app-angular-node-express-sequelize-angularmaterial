import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GamescoreService } from './gamescore.service';

describe('GamescoreService', () => {
  let service: GamescoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
      
        HttpClientTestingModule,
  
    
    ],
    });
    service = TestBed.inject(GamescoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
