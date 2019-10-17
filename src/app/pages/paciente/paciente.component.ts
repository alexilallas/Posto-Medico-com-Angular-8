import { Component, OnInit } from '@angular/core';

import { Paciente } from './paciente';
import { PacienteService } from './paciente.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from '../../../environments/environment';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import { DatatablesComponent } from '../../shared/datatables/datatables.component';


@Component({
  selector: 'paciente-cmp',
  moduleId: module.id,
  templateUrl: 'paciente.component.html'
})

export class PacienteComponent extends DatatablesComponent implements OnInit {

  public _sexo = ['Masculino', 'Feminino'];
  public _estado_civil = ['Solteiro(a)', 'Casado(a)', 'Viúvo(a)'];
  public _tipo_paciente = ['Aluno', 'Funcionário', 'Dependente', 'Comunidade', 'Serviço Prestado'];
  public _cursos = ['ADMINISTRAÇÃO', 'ARQUITETURA E URBANISMO', 'AGRONOMIA', 'CIÊNCIAS BIOLÓGICAS', 
  'CIÊNCIAS SOCIAIS', 'CIÊNCIAS - HABILITAÇÃO EM BIOLOGIA', 'CIÊNCIAS - HABILITAÇÃO EM FÍSICA', 
  'CIÊNCIAS - HABILITAÇÃO EM MATEMÁTICA', 'CIÊNCIAS - HABILITAÇÃO EM QUÍMICA', 'DIREITO', 'ENGENHARIA CIVIL', 
  'ENGENHARIA DE PESCA', 'ENGENHARIA DA COMPUTAÇÃO', 'ENGENHARIA DA PRODUÇÃO', 'ENGENHARIA MECÂNICA', 
  'FORMAÇÃO DE OFICIAIS - POLÍCIA MILITAR', 'FORMAÇÃO DE OFICIAIS - BOMBEIRO MILITAR', 'FILOSOFIA', 'FÍSICA', 
  'GEOGRAFIA', 'HISTÓRIA', 'LETRAS', 'MATEMÁTICA', 'MEDICINA VETERINÁRIA', 'MÚSICA', 'PEDAGOGIA', 'QUÍMICA', 'ZOOTECNIA'];
  public _setores = [];

  public form: any = new Paciente();
  public modal = 'pacienteModal';
  public modalDelete = 'pacienteModalDelete';
  public pacientes: any[];
  public isNewPaciente: boolean = true;

  constructor
    (
      private pacienteService: PacienteService,
      private viacep: NgxViacepService,
      public ngxSmartModalService: NgxSmartModalService
    ) {
    super();
    console.log('PacienteComponent')
  }

  ngOnInit() {
    this.dtOptions = environment.dtOptions
    this.dtOptions.order = [0, 'asc']
    this.getPacientes()
  }

  getPacientes(): any {
    this.pacienteService.getPacientes()
      .subscribe(response => {
        this.pacientes = response
        this.rerenderTable()
      })
  }

  save() {
    this.savePaciente()
    PacienteService.pacienteCreatedAlert.subscribe(
      () => {
        this.eraseForm()
        this.getPacientes()
        this.close()
        PacienteService.pacienteCreatedAlert.isStopped = true
      }
    )
  }

  savePaciente() {
    this.pacienteService.postPaciente(this.form)
  }

  openFormEdit(id) {
    this.isNewPaciente = false
    this.form.paciente_id = id
    this.pacienteService.getPacienteById(id)
      .subscribe(response => {
        this.form = response
      })
    this.ngxSmartModalService.open(this.modal)
  }


  update() {
    this.updatePaciente()
    PacienteService.pacienteUpdatedAlert.subscribe(
      () => {
        this.eraseForm()
        this.getPacientes()
        this.close()
        PacienteService.pacienteUpdatedAlert.isStopped = true
      }
    )

  }

  updatePaciente() {
    this.pacienteService.updatePaciente(this.form)
  }

  openFormDelete(id) {
    this.pacienteService.getPacienteById(id)
      .subscribe(response => {
        this.form = response
      })
    this.ngxSmartModalService.open(this.modalDelete)
  }

  delete() {
    let id = this.form.id
    this.pacienteService.delete(id)
    PacienteService.pacienteDeletedAlert.subscribe(
      () => {
        this.getPacientes()
        this.closeDeleteForm()
        PacienteService.pacienteDeletedAlert.isStopped = true
      }
    )
  }

  close() {
    this.isNewPaciente = true
    this.eraseForm()
    this.ngxSmartModalService.close(this.modal)
  }

  closeDeleteForm() {
    this.eraseForm()
    this.ngxSmartModalService.close(this.modalDelete)
  }

  eraseForm() {
    this.form = {}
  }

  getEnderecoViaCep($event, cep): any {
    this.viacep.buscarPorCep(cep)
      .then((endereco: Endereco) => {
        this.form.estado = endereco.uf
        this.form.cidade = endereco.localidade
        this.form.bairro = endereco.bairro
        this.form.logradouro = endereco.logradouro
      })
      .catch((error: ErroCep) => {
        console.log(error.message);
      });
  }
}
