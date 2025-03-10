import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class ExpenseFormComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  categories = signal<Category[]>([]);
  isEditMode = signal<boolean>(false);
 expenseId = signal<string | undefined>(undefined);
  formTitle = signal<string>('Add New Expense');

  dateControl = new FormControl<Date | null>(null, { validators: Validators.required });
  amountControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.min(0.01)],
  });
  categoryControl = new FormControl<string>('', { validators: Validators.required, nonNullable: true });
  descriptionControl = new FormControl<string>('', { validators: Validators.required, nonNullable: true });

  displayAmount: string = ''; 

  expenseForm = new FormGroup({
    date: this.dateControl,
    amount: this.amountControl,
    category: this.categoryControl,
    description: this.descriptionControl,
  });

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.expenseId.set(id);
      this.formTitle.set('Edit Expense');
      this.loadExpense(id);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categoriesData) => {
      this.categories.set(categoriesData);
    });
  }

  loadExpense(id: string): void {
    this.expenseService.getExpenseById(id).subscribe((expense) => {
      const dateObject = expense.date ? new Date(expense.date) : null;
      const formattedAmount = expense.amount.toFixed(2);

      this.expenseForm.patchValue({
        date: dateObject,
        amount: formattedAmount,
        category: expense.category,
        description: expense.description,
      });
    });
  }

  formatAmountOnBlur(): void {
    const amountValue = this.amountControl.value;

    if (amountValue) {
      const amountNumber = parseFloat(amountValue);

      if (!isNaN(amountNumber)) {
        const formattedAmount = amountNumber.toFixed(2);
        this.amountControl.setValue(formattedAmount, { emitEvent: false });
      }
    }
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      return;
    }
  
    const dateValue = this.dateControl.value;
    const dateString = dateValue ? dateValue.toISOString().split('T')[0] : '';
  
    const expense: Expense = {
      date: dateString,
      amount: parseFloat(this.amountControl.value ?? '0'),
      category: this.categoryControl.value ?? '',
      description: this.descriptionControl.value ?? '',
    };
  
    if (this.isEditMode() && this.expenseId()) {
      expense.id = this.expenseId();
      this.expenseService.updateExpense(expense).subscribe({
        next: () => {
          this.snackBar.open('Expense updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/expenses']);
        },
        error: () => {
          this.snackBar.open('Error updating expense', 'Close', { duration: 3000 });
        },
      });
    } else {
      this.expenseService.addExpense(expense).subscribe({
        next: () => {
          this.snackBar.open('Expense added successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/expenses']);
        },
        error: () => {
          this.snackBar.open('Error adding expense', 'Close', { duration: 3000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/expenses']);
  }
}