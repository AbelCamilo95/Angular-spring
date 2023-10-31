import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];



  constructor(private clienteService: ClienteService)  { }

  ngOnInit() {

    // metodo sincrono
    // this.clientes = this.clienteService.getClientes();
    // metodo asincrono
    this.clienteService.getClientes().subscribe(
      // funcion anonima
      clientes => this.clientes = clientes
    );
    // metodo asincrono con function tambien valido
    // this.clienteService.getClientes().subscribe(
    //   // funcion anonima
    //   function(clientes) => {               //se pueden poner mas argumentos en la funcion
    //     this.clientes = clientes
    //   }
    // );
  }

  habilitar: boolean = true;

  setHabilitar() :void{

    this.habilitar = (this.habilitar==true)? false : true
  }

  delete(cliente:Cliente):void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'estas seguro?',
      text: `¿seguro que quieres eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado',
              'Cliente Eliminado con exito.',
              'success'
            )
          }
        )
      }
    })
  }
}
