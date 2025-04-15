import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/data/expense/expense.service';
import { CategoryService } from '../../services/data/category/category.service';
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    DatePipe
  ]
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  categories: Category[] = [];
  totalExpenses = 0;
  expensesByCategory: { category: string, amount: number }[] = [];
  recentExpenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadCategories();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotalExpenses();
      this.calculateExpensesByCategory();
      this.getRecentExpenses();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateExpensesByCategory(): void {
    const categoryMap = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });
    
    this.expensesByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => {
      return { category, amount };
    });
  }

  getRecentExpenses(): void {
    this.recentExpenses = [...this.expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }
}