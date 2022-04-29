import * as firebase from "firebase";

export class Bd {
  public publicar(publicacao: any): void {
    console.log(publicacao)

    let nomeImagem = Date.now()

    //upload pro storage do firebase
    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    //   .push( { titulo: publicacao.titulo } )
  }
}
