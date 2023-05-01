import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() results = new EventEmitter<any>();
  @Output() cached = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.form = this.fb.group({
      days: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    const days = this.form.controls["days"].value;
    this.dataService.getData(days).subscribe((data: any) => {
      this.results.emit(data.info);
      this.cached.emit(data.cache);
    });
  }
}
