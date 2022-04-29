import * as firebase from "firebase";

export class Bd {
  public publicar(publicacao: any): void {
    console.log(publicacao)
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( { titulo: publicacao.titulo } )
  }
}
