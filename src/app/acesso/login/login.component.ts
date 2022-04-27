import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Autenticacao } from 'src/app/autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required
    ]),
    'senha': new FormControl(null, [
      Validators.required, Validators.minLength(6)
    ])
  })

  public mensagem!: string

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
      .then((resposta: any) => this.mensagem = resposta)
  }

}
