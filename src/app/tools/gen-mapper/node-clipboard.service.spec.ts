import { TestBed } from '@angular/core/testing';

import { NodeClipboardService } from './node-clipboard.service';

describe('NodeClipboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeClipboardService = TestBed.get(NodeClipboardService);
    expect(service).toBeTruthy();
  });
});
