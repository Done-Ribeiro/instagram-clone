import { Injectable } from "@angular/core";

import * as firebase from "firebase";
import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

  constructor(
    private progresso: Progresso
  ) { }

  public publicar(publicacao: any): void {
    // console.log(publicacao)

    //faremos este processo aqui, para em seguida garantir uma imagem unica no storage...
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        //enviando a KEY para o storage, garantimos que a imagem tera um nome unico
        //pois agora o nome da imagem, sera o valor da KEY
        let nomeImagem = resposta.key

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
      })
  }

  public consultaPublicacoes(emailUsuario: string): any {

    //consultar as publicações (database)
    firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
      /**
       * on() -> listener | once() -> snapshot
       * como parametro, passamos o evento que queremos executar
       */
      .once('value')
      .then((snapshot: any) => {
        // console.log(snapshot.val())
        let publicacoes: Array<any> = []

        snapshot.forEach((childSnapshot: any) => {

          let publicacao = childSnapshot.val()

          //consultar a url da imagem (storage)
          firebase.storage().ref()
            .child(`imagens/${childSnapshot.key}`)
            .getDownloadURL()
            .then((url: string) => {
              //montando objeto -> publicacao = { titulo, url_imagem }
              publicacao.url_imagem = url

              //consultar o nome do usuário
              firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any) => {
                  publicacao.nome_usuario = snapshot.val().nome_usuario

                  //colocando a publicacao no array de publicacoes
                  publicacoes.push(publicacao)
                })
            })
        })

        console.log(publicacoes)

      })
  }
}
