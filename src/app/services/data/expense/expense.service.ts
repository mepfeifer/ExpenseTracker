import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../../../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl).pipe(
      map(expenses => [...expenses].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }))
    );
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?category=${category}`);
  }

  getExpensesByDateRange(startDate: Date, endDate: Date): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?date_gte=${startDate}&date_lte=${endDate}`);
  }
}