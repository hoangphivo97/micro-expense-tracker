import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { MatSelect } from "@angular/material/select";
import { MatOption } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseList, FilterParams } from '../../../interface/expense.interface';
import { CommonModule } from '@angular/common';
import { months } from '../../../strings/object';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelect, MatOption, MatInputModule, MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule, MatIcon, MatTooltipModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  inputDataSource = input<MatTableDataSource<ExpenseList>>()
  currMonth: number = new Date().getMonth() + 1;
  currYear: number = new Date().getFullYear();
  yearsList: number[] = []; //Will get from list of Expense created Date

  initFilterState = {
    searchTerm: '',
    month: this.currMonth,
    year: this.currYear
  }


  filterForm = new FormGroup({
    searchTerm: new FormControl(this.initFilterState.searchTerm),
    month: new FormControl(this.initFilterState.month),
    year: new FormControl(this.initFilterState.year)
  })

  @Output() filterChange = new EventEmitter<FilterParams>();

  ngOnInit(): void {
    this.handleYearSelected();
    this.initFilter();
    this.handleFilter();
  }

  onSearch(event: Event) {
    const dataSource = this.inputDataSource()
    const value: string = (event.target as HTMLInputElement).value
    const filterdValue: string = value.trim() && value.toLowerCase()
    if (dataSource) {
      dataSource.filter = filterdValue
    }
  }

  initFilter() {
    this.filterForm.setValue({ ...this.initFilterState })
  }

  resetFilter() {
    this.initFilter();
  }

  handleFilter() {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterChange.emit(value as FilterParams)
    })
  }

  //If currYear not in list then Add it to list
  handleYearSelected() {
    if (!this.yearsList.includes(this.currYear)) {
      this.yearsList.push(this.currYear)
    }
    this.yearsList.sort((a: number, b: number) => a - b);
  }

  get months() {
    return months
  }

  get hasUserFiltered() : boolean {
    return JSON.stringify(this.filterForm.value) !== JSON.stringify(this.initFilterState);
  }

}
