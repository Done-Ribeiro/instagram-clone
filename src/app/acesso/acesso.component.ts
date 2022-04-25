import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),

        //0 void -----X----------------X--X--X--X--X--X--X-- criado 1.5s//
        animate('1.5s 0s ease-in-out', keyframes([
          /**
           * valor maximo do offset: 1
           * de void para o primeiro offset 0.15,
           * o periodo de transição é 15% do valor total
           * que nesse caso é 1.5s (definido do animate acima)
           * (e assim consecutivamente)
           */
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

          //efeito de "chamar a atenção"
          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),//desloca imagem de 0.86 ~ 0.88 10px pra cima
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),//desloca imagem de 0.88 ~ 0.90 10px pra baixo agora
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),

          // style({ offset: 1, opacity: 1, transform: 'translateX(0)' })
        ])) //duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false
  }

}
