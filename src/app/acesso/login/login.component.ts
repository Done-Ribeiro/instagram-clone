import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';

import { Autenticacao } from 'src/app/autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animacao-login', [
      state('criado', style({
        opacity: 1
      })),
      state('erro', style({
        opacity: 1
      })),
      transition('criado => erro', [
        animate('200ms', keyframes([
          style({ offset: 0.25, transform: 'translateX(-10px)' }),
          style({ offset: 0.50, transform: 'translateX(10px)' }),
          style({ offset: 0.75, transform: 'translateX(-10px)' }),
          style({ offset: 0.99, transform: 'translateX(10px)' }),
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public estadoLogin: string = 'criado'

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
      .then((resposta: any) => {
        this.mensagem = resposta
        this.estadoLogin = 'erro'
      })
  }

}
