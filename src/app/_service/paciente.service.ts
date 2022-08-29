import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteCambio: Subject<Paciente[]> = new Subject<Paciente[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();
  private url: string = `${environment.HOST}/pacientes`;  //ES6  Template Strings ``

  constructor(private http: HttpClient) { }

  listar() {
    //return this.http.get(environment.HOST + "/pacientes");
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //////////////////////////
  getPacienteCambio() {
    return this.pacienteCambio.asObservable();
  }

  setPacientecambio(lista: Paciente[]) {
    this.pacienteCambio.next(lista);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

}