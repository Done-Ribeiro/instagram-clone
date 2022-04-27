import { CanActivate } from "@angular/router"

export class AutenticacaoGuard implements CanActivate {
  canActivate(): boolean {
    return false
  }
}
