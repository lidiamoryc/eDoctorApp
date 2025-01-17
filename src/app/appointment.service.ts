import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

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

  private baseUrl = environment.databaseType === 'firebase'
    ? environment.firebaseConfig.databaseURL
    : environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getUrl(type: 'appointments' | 'absences', id?: string): string {
    if (environment.databaseType === 'firebase') {
      return id
        ? `${this.baseUrl}/${type}/${id}.json`
        : `${this.baseUrl}/${type}.json`;
    }
    return id ? `${this.baseUrl}/${id}` : this.baseUrl;
  }

  getAppointments(): Observable<Appointment[]> {
    const url = this.getUrl('appointments');
    return this.http.get<Appointment[]>(url).pipe(
      map(data => {
        if (environment.databaseType === 'firebase') {
          return Object.keys(data || {}).map(key => ({
            id: key,
            ...data[key]
          }));
        }
        return data;
      })
    );
  }

  addAppointment(appointment: Appointment): Observable<any> {
    const url = this.getUrl('appointments');
    return this.http.post(url, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    const url = this.getUrl('appointments', appointment.id);
    return this.http.put(url, appointment);
  }

  deleteAppointment(id: string): Observable<any> {
    const url = this.getUrl('appointments', id);
    return this.http.delete(url);
  }

  getAbsences(): Observable<Absence[]> {
    const url = this.getUrl('absences');
    return this.http.get<Absence[]>(url).pipe(
      map(data => {
        if (environment.databaseType === 'firebase') {
          return Object.keys(data || {}).map(key => ({
            id: key,
            ...data[key]
          }));
        }
        return data;
      })
    );
  }

  addAbsence(absence: Absence): Observable<any> {
    const url = this.getUrl('absences');
    return this.http.post(url, absence);
  }
}
