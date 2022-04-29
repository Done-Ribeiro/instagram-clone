import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import * as firebase from 'firebase'

import { Bd } from 'src/app/bd.service'
import { Progresso } from 'src/app/progresso.service'

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email!: any
  private imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload!: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
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

    /**
     * o interval fara neste caso, a casa 1.5s incrementar um int de forma sequencial
     * porem estamos interessados na habilidade de desparar um evento a cada 1.5s
     * que eh algo semelhante ao setTimeout,
     * so que ao invez de utilizar o setTimeout,
     * utilizaremos um Observable
     */
    let acompanhamentoUpload = interval(1500)

    /**
     * Subject -> serve para submeter valores, para nosso observable
     * vamos criar um subject para ajudar a efetuar o unsubscribe
     */
    let continua = new Subject();
    continua.next(true);//produz um evento com o valor de true

    /**
     * agora vamos assinar o observable
     *
     * como o interval nao preve uma parada, precisamos forçar que ele pare
     * quando o status === concluido
     *
     * para isso faremos um unsubscribe nesse observable, evitando novos eventos
     * utilizando em conjunto com o subscribe o metodo => takeUntil()
     */
    acompanhamentoUpload.pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progresso.estado);
        // console.log(this.progresso.status);
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          continua.next(false);//produz um evento com o valor false,
          //modificando o valor recebido no observable
          //interrompendo o fluxo de streams do nosso interval
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
