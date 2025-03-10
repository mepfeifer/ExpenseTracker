import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterLink,
    DatePipe
  ]
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'actions'];

  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
      data: { title: 'Delete Expense', message: 'Are you sure you want to delete this expense?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(id).subscribe({
          next: () => {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.snackBar.open('Expense deleted successfully', 'Close', {
              duration: 3000
            });
          },
          error: (err) => {
            console.error('Error deleting expense:', err);
            this.snackBar.open('Error deleting expense', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }
  
  viewExpenseDetails(id: number): void {
    this.router.navigate(['/expenses', id]);
  }
  
  editExpense(id: number): void {
    this.router.navigate(['/expenses/edit', id]);
  }
}