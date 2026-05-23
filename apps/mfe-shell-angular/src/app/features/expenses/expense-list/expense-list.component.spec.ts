import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListComponent } from './expense-list.component';
import {
  ExpenseList,
  PaidMethodEnum,
} from '../../../interface/expense.interface';
import { of, Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { MatTableModule } from '@angular/material/table';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { expect, describe, it, beforeEach, afterEach } from '@jest/globals';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SettingsServiceService } from '../../../services/SettingsService/settings-service.service';
import { AuthService } from '../../../../../../../libs/auth/data-access/src/lib/auth-data-access/RouteGuard/auth.service';

class MockExpeseService {
  private _$ = new Subject<ExpenseList[]>();
  getExpense() {
    return this._$.asObservable();
  }
  emit(data: ExpenseList[]) {
    this._$.next(data);
  }
  delete = jest.fn();
}

class MockDialog {
  open = jest.fn().mockReturnValue({
    afterClose: () => of(true),
  });
}

const mockAuthService = {
  user$: of({ uid: 'u1', email: 'test@example.com' }),
  isLoggedIn: jest.fn().mockReturnValue(true),
  login: jest.fn(),
  logout: jest.fn(),
};

const mockSettingsService = {
  // tuỳ hàm nào component gọi thì bạn mock
  getSettings: jest.fn().mockReturnValue(of({ theme: 'dark' })),
};

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let svc: MockExpeseService;
  let dialog: MockDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseListComponent, NoopAnimationsModule, MatTableModule],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: 'ExpenseService', useClass: MockExpeseService },
        { provide: MatDialog, useClass: MockDialog },
      ],
    })
      .overrideProvider(ExpenseService, { useValue: MockExpeseService })
      .overrideProvider(SettingsServiceService, {
        useValue: mockSettingsService,
      })
      .overrideProvider(AuthService, { useValue: mockAuthService })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    svc = TestBed.inject(ExpenseService) as unknown as MockExpeseService;

    fixture.detectChanges();
  });

  it('Should redner expense rows from service data', async () => {
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const data: ExpenseList[] = [
      {
        id: '1',
        date: new Date('2025-09-11T00:00:00.000Z'),
        description: 'test',
        purpose: 'test',
        paid: PaidMethodEnum.CASH,
        for: 'Me',
        amount: 100000,
        createdAt: new Date('2025-09-11T00:00:00.000Z'),
      },
      {
        id: '2',
        date: new Date('2025-09-12T00:00:00.000Z'),
        description: 'test',
        purpose: 'test',
        paid: PaidMethodEnum.CASH,
        for: 'Me',
        amount: 105000,
        createdAt: new Date('2025-09-12T00:00:00.000Z'),
      },
    ];

    svc.emit(data);
    fixture.detectChanges();

    const table = await loader.getHarness(MatTableHarness);
    const rows = await table.getRows();

    expect(rows.length).toBe(2);

    const firstRowCells = await rows[0].getCellTextByIndex();
    expect(firstRowCells).toContain('Cà phê');
    expect(firstRowCells).toContain('45000');
  });
});
