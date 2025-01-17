import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Appointment, Absence } from './appointment.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://edoctorapp-f0008-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  // Appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<{[key: string]: Appointment}>(`${this.baseUrl}/appointments.json`)
      .pipe(
        map(response => {
          if (!response) return [];
          return Object.keys(response).map(key => ({
            id: key,
            ...response[key]
          }));
        })
      );
  }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments.json`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    const { id, ...appointmentData } = appointment;
    return this.http.put(`${this.baseUrl}/appointments/${id}.json`, appointmentData);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}.json`);
  }

  // Absences
  getAbsences(): Observable<Absence[]> {
    return this.http.get<{[key: string]: Absence}>(`${this.baseUrl}/absences.json`)
      .pipe(
        map(response => {
          if (!response) return [];
          return Object.keys(response).map(key => ({
            id: key,
            ...response[key]
          }));
        })
      );
  }

  addAbsence(absence: Absence): Observable<any> {
    return this.http.post(`${this.baseUrl}/absences.json`, absence);
  }
} 