import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { Usuario } from '../usuario.model';
import { Autenticacao } from 'src/app/autenticacao.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    trigger('animacao-cadastro', [
      state('criado', style({})),
      state('erro', style({})),
      transition('criado => erro', [
        animate('200ms', keyframes([
          style({ offset: 0.25, transform: 'translateX(10px)' }),
          style({ offset: 0.50, transform: 'translateX(-10px)' }),
          style({ offset: 0.75, transform: 'translateX(10px)' }),
          style({ offset: 0.99, transform: 'translateX(-10px)' })
        ]))
      ])
    ])
  ]
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public mensagem!: any

  public estadoCadastro: string = 'criado'

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required
    ]),
    'nome_completo': new FormControl(null, [
      Validators.required
    ]),
    'nome_usuario': new FormControl(null, [
      Validators.required
    ]),
    'senha': new FormControl(null, [
      Validators.required, Validators.minLength(6)
    ])
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )

    this.autenticacao.cadastrarUsuario(usuario)
      .then((erro: Error) => {
        if (erro) {
          this.mensagem = erro
          this.estadoCadastro = 'erro'
        } else {
          this.exibirPainelLogin()
        }
      })
  }

}
