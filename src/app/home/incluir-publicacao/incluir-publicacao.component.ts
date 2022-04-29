import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import * as firebase from 'firebase'

import { Bd } from 'src/app/bd.service'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email!: any
  private imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(): void {
    /**
     * metodo que se inscreve no observable do firebase
     * que dispara eventos, quando existem modificações
     * no estado do usuario autenticado
     *
     * o que na prática, nos da a possibilidade
     * de acessar o estado atual da autenticação do usuario
     */
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
