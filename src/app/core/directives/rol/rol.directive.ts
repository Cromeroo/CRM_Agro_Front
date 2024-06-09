/*{
  import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

@Directive({
  selector: '[appRol]',
  standalone: true
})
export class RolDirective 
  private usuario: UsuarioModel;
  private roles: string[];
  constructor(   
    private templateRef: TemplateRef<any>,
    private viewContainer : ViewContainerRef,
    private usuariosService: UsuariosService) 
    {}

    ngOninit(): void{
      this.usuario= this.usuariosService.usuario;
    }
    @Input('appRol')

}*/
