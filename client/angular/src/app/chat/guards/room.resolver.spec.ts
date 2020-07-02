import { TestBed } from '@angular/core/testing';
import { ChatResolver } from './room.resolver';

describe('ChatResolver', () => {
  let chatResolver: ChatResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    chatResolver = TestBed.inject(ChatResolver);
  });

  it('should be created', () => {
    expect(chatResolver).toBeTruthy();
  });
});
