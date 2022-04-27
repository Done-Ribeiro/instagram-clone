import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Usuario } from "./acesso/usuario.model"
import * as firebase from "firebase"

@Injectable()
export class Autenticacao {

  public token_id!: string

  constructor(
    private router: Router
  ) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        /**
         * se houver sucesso na gravacao da autho usuario
         * agora salva o resto dos dados do form no database
         *
         * ficando assim:
         * ex.: usuario_detalhe/ teste@gmail.com
         *
         * porem os nós no firebase nao podem conter caracteres especiais
         * e um email contem/pode conter
         * entao precisamos converter a string do email
         * para base64, para poder passa-la para o nó
         * (criptografar o email para base64) -> btoa
         */

        //regra de negócio: nao gravaremos a senha no banco de dados
        delete usuario.senha

        //registrando dados complementarios do usuario no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)//set() -> metodo p/ salvar e nao ter referencias duplicadas de usuarios
      })
      .catch((error: Error) => console.log(error))
  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => {
        firebase.auth().currentUser?.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken
            this.router.navigate(['/home'])
          })
      })
      .catch((error: Error) => console.log(error))
  }

  public autenticado(): boolean {
    return this.token_id !== undefined
  }
}
