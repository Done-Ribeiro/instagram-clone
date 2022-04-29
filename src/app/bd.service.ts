import { Injectable } from "@angular/core";

import * as firebase from "firebase";
import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

  constructor(
    private progresso: Progresso
  ) { }

  public publicar(publicacao: any): void {
    console.log(publicacao)

    let nomeImagem = Date.now()

    //upload pro storage do firebase
    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        //acompanhamento do progresso do upload
        (snapshot: any) => {
          this.progresso.status = 'andamento'
          this.progresso.estado = snapshot
          // console.log('Snapshot capturado no on(): ', snapshot)
        },
        (erro: Error) => {
          this.progresso.status = 'erro'
          // console.log(erro)
        },
        () => {
          //finalização do processo
          this.progresso.status = 'concluido'
          // console.log('upload completo')
        }
      )//listener on(recebe um evento)


    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    //   .push( { titulo: publicacao.titulo } )
  }
}
