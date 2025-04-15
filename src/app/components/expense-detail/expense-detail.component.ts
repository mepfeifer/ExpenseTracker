import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../../services/data/expense/expense.service';
import { Expense } from '../../models/expense.model';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe
  ]
})
export class ExpenseDetailComponent implements OnInit {
  expense: Expense | null = null;
  
  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExpense(id);
    } else {
      this.snackBar.open('No expense ID provided', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/expenses']);
    }
  }

  loadExpense(id: string): void {
    this.expenseService.getExpenseById(id).subscribe({
      next: (expense) => {
        this.expense = expense;
      },
      error: (err) => {
        console.error('Error loading expense:', err);
        this.snackBar.open('Error loading expense details', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/expenses']);
      }
    });
  }

  editExpense(): void {
    if (this.expense) {
      this.router.navigate(['/expenses/edit', this.expense.id]);
    }
  }

  deleteExpense(): void {
    if (!this.expense) return;
    
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
      data: { title: 'Delete Expense', message: 'Are you sure you want to delete this expense?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.expense) {
        this.expenseService.deleteExpense(this.expense.id!).subscribe({
          next: () => {
            this.snackBar.open('Expense deleted successfully', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/expenses']);
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

  goBack(): void {
    this.router.navigate(['/expenses']);
  }
}