import { ClienteService } from './cliente.service';
import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo:string="Crear Cliente"

  constructor(private ClienteService:ClienteService,
  private router:Router,
  private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.ClienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

   create():void{
    this.ClienteService.create(this.cliente)
    .subscribe(response => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo CLiente',`Cliente ${this.cliente.nombre} ${this.cliente.apellido} creado con exito`,'success')
    }
    );
  }

  update(): void{
    this.ClienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('CLiente Actualizado',`Cliente ${cliente.nombre} ${this.cliente.apellido} actualizado con exito`,'success')
    }

    )
  }

}
