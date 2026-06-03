import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { expect, describe, it, beforeEach } from '@jest/globals';

describe('Theme', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    // Assert that the service instantiates correctly to clear empty function and unused var rule violations
    expect(service).toBeTruthy();
  });
});