import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatOptionModule, // Import MatOptionModule
    MatSelectModule, // Import MatSelectModule
  ],
})
export class AppointmentDialogComponent {
  appointmentForm: FormGroup;
  fullHourOptions: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      date: string;
      title: string;
      startTime: string;
      endTime: string;
      color?: string;
    },
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.generateFullHourOptions();

    this.appointmentForm = this.formBuilder.group(
      {
        title: [this.data.title || '', Validators.required],
        date: [this.data.date, Validators.required],
        startTime: [this.data.startTime || '', Validators.required],
        endTime: [this.data.endTime || '', Validators.required],
      },
      { validators: this.timeRangeValidator }
    );
  }

  private generateFullHourOptions(): void {
    this.fullHourOptions = [];
    const startHour = 9; // Start at 9:00
    const endHour = 16; // End at 16:00
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        if (hour === endHour && minutes > 0) break; // Exclude 16:30
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinutes = minutes === 0 ? '00' : `${minutes}`;
        this.fullHourOptions.push(`${formattedHour}:${formattedMinutes}`);
      }
    }
  }
  

  private formatAsYYYYMMDD(dateValue: any): string {
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.appointmentForm.valid) {
      const rawDateValue = this.appointmentForm.controls['date'].value;
      const dateString = this.formatAsYYYYMMDD(rawDateValue);

      const data = {
        title: this.appointmentForm.controls['title'].value,
        date: dateString,
        startTime: this.appointmentForm.controls['startTime'].value,
        endTime: this.appointmentForm.controls['endTime'].value,
        id: this.data.id,
      };
      this.dialogRef.close(data);
    }
  }

  onEditClick(): void {
    if (this.appointmentForm.valid) {
      const rawDateValue = this.appointmentForm.controls['date'].value;
      const dateString = this.formatAsYYYYMMDD(rawDateValue);

      const updatedAppointment = {
        title: this.appointmentForm.controls['title'].value,
        date: dateString,
        startTime: this.appointmentForm.controls['startTime'].value,
        endTime: this.appointmentForm.controls['endTime'].value,
        id: this.data.id,
      };

      this.appointmentService.updateAppointment(updatedAppointment).subscribe({
        next: (response) => {
          console.log('Appointment updated successfully:', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error updating appointment:', err);
        },
      });
    }
  }

  onDeleteClick(): void {
    this.appointmentService.deleteAppointment(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close({ remove: true, id: this.data.id });
      },
      error: (err) => {
        console.error('Error deleting appointment:', err);
      },
    });
  }

  timeRangeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':');
      const [endHours, endMinutes] = endTime.split(':');

      const startDate = new Date();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);

      if (startDate >= endDate) {
        return { timeRangeInvalid: true };
      }
    }
    return null;
  };
}
