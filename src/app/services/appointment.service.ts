import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export interface Appointment {
  id?: string;
  date: string;
  name_and_surname: string;
  type: string;
  age: number;
  gender?: string;
  startTime: string;
  endTime: string;
  additional_info?: string;
  color?: string;
}

export interface Absence {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private firebaseService: FirebaseService, private authService: AuthService) {}

  getAppointments(): Observable<Appointment[]> {
    return this.firebaseService.getAppointments();
  }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.firebaseService.addAppointment(appointment);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    return this.firebaseService.updateAppointment(appointment);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.firebaseService.deleteAppointment(id);
  }

  getAbsences(): Observable<Absence[]> {
    return this.firebaseService.getAbsences();
  }

  addAbsence(absence: any): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user || !['doctor', 'admin'].includes(user.role)) {
          throw new Error('Unauthorized');
        }
        
        const absenceWithDoctor = {
          ...absence,
          doctorId: user.uid
        };
        
        return this.firebaseService.addAbsence(absenceWithDoctor);
      })
    );
  }
}
