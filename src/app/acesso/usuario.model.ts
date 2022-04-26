export class Usuario {
  constructor(
    public email: string,
    public nome_completo: string,
    public nome_usuario: string,
    public senha: any//trocando pra any, pra poder deletarmos antes de salvar no banco de dados
  ) { }
}
