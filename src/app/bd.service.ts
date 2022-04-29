import * as firebase from "firebase";

export class Bd {
  public publicar(publicacao: any): void {
    console.log(publicacao)

    let nomeImagem = Date.now()

    //upload pro storage do firebase
    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        //acompanhamento do progresso do upload
        (snapshot: any) => console.log(snapshot),
        (erro: Error) => console.log(erro),
        () => {
          //finalização do processo
          console.log('upload completo')
        }
      )//listener on(recebe um evento)


    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    //   .push( { titulo: publicacao.titulo } )
  }
}
