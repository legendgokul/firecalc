import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firecalc';


    CurrentPage = 1;
  monthlyExpense = 0;
  yearlyExpense = 0;
  ExpenseArray: number[] = [];

  form1:FormGroup; // basic expense form

  constructor (private fb: FormBuilder)
  {
    this.form1=this.fb.group({
      grocery_expense: this.fb.group({ value: [null], term: [1] }),
      RENT: this.fb.group({ value: [null], term: [1] }),
      everyday_adhoc: this.fb.group({ value: [null], term: [1] }),

      lpg : this.fb.group({ value: [null], term: [1] }),
      mobile_recharge : this.fb.group({ value: [null], term: [1] }),
      internet_Recharge : this.fb.group({ value: [null], term: [1] }),
      Drinking_Water_Bill : this.fb.group({ value: [null], term: [1] }),
      milk_subscription : this.fb.group({ value: [null], term: [1] }),
      electric_bill : this.fb.group({ value: [null], term: [2] }),
      society_maintenance : this.fb.group({ value: [null], term: [1] }),
      Insurance : this.fb.group({ value: [null], term: [1] }),
      adhoc_expense : this.fb.group({ value: [null], term: [1] }),

      movie_budget : this.fb.group({ value: [null], term: [1] }),
      tv_subscription : this.fb.group({ value: [null], term: [1] }),
      netflix : this.fb.group({ value: [null], term: [1] }),
      prime : this.fb.group({ value: [null], term: [1] }),
      hotstar : this.fb.group({ value: [null], term: [1] }),
      sonyliv : this.fb.group({ value: [null], term: [1] }),
      crunchyroll : this.fb.group({ value: [null], term: [1] }),
      zee5 : this.fb.group({ value: [null], term: [1] }),
      ps5_pass : this.fb.group({ value: [null], term: [1] }),
      xbox_pass : this.fb.group({ value: [null], term: [1] }),

      gym :this.fb.group({ value: [null], term: [1] }),
      parlour :this.fb.group({ value: [null], term: [1] }),
      club :this.fb.group({ value: [null], term: [1] }),
      Cosmetics :this.fb.group({ value: [null], term: [1] }),
      DinningOut :this.fb.group({ value: [null], term: [1] }),

      Adobe :this.fb.group({ value: [null], term: [1] }),
      VPN :this.fb.group({ value: [null], term: [1] }),
      Cloud_Hosting :this.fb.group({ value: [null], term: [1] })
    });

  }


  ngOnInit() {

  }

  CalculateExpense(page:number)
  {

    console.log("Page 1 Data");
        const rawData = this.form1.value;
        let currentFormExpense: number = 0;
        Object.entries(rawData).forEach(([key, group]) => {
          
          const g = group as { value: number|null; term: number };
          const value = g.value;
          const term = g.term;

          if (value != null) {
            currentFormExpense += value/term;
          }
          console.log(value, term);
        });
        this.ExpenseArray[0]=currentFormExpense;
        console.log("Current Form Expense:", currentFormExpense);

  }

  generateTotalExpense()
  {
    const rawData = this.form1.value;
    let monthlyTotal: number = 0;
    let hasValues = false;
    
    Object.entries(rawData).forEach(([key, group]) => {
      const g = group as { value: number|null; term: number };
      const value = g.value;
      const term = g.term;

      if (value != null && value > 0) {
        hasValues = true;
        // Divide by term to get monthly expense
        monthlyTotal += value / term;
      }
    });
    
    if (hasValues) {
      this.monthlyExpense = monthlyTotal;
      this.yearlyExpense = monthlyTotal * 12;
    } else {
      alert('Please enter at least one expense value');
    }
  }
}
