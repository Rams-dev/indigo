import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatFormFieldModule, MatInput, MatButton],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'idUsuario',
    'nombre',
    'noTelefono',
    // 'colorTorre',
    // 'chasis',
    // 'estatusLavado',
    'opciones' 
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private router:Router
    // public api: HttpService,
    // public ordenLavadoService: OrdenLavadoService, 
    // private dialog: MatDialog,
    // private toasterService: ToastBarService,
  ) { 
    
    
  }

  ngOnInit(): void {
    // this.ordenLavadoService.typeMessage$.subscribe(type => {
    //   if(type == 'cambioEstatusOrden' || type == 'solicitudCambioEspacioLavado'){
    //     this.listOrdenes()
    //   }
    // })

    // this.listOrdenes()
    
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nuevo(){
    this.router.navigate(["/usuarios/nuevo"])
  }


  // openModal(){
  //   const dialogref = this.dialog.open(ModalOrdenFormComponent, { width: '85%', height: 'auto' })
  //   .afterClosed().subscribe(data => {
  //     if(data == 'creado'){
  //       this.listOrdenes()
  //     }
  //   });
  // }


  // calificar(element:any){
  //   const dialogref = this.dialog.open(ModalFormCalificacionComponent, { width: '50%', height: 'auto', data:element })
  //   .afterClosed().subscribe(data => {
  //     if(data == 'creado'){
  //       this.listOrdenes()
  //     }
  //   });

  // }


  edit(element: any){
    console.log(element);
    
    // const dialogref = this.dialog.open(ModalOrdenFormComponent, { width: '85%', height: 'auto', data: element })
    // .afterClosed().subscribe(data => {
    //   if(data == 'editado'){
    //     this.listOrdenes()
    //   }
    // });
  }


  // listOrdenes(){
  //   this.ordenLavadoService.getOLs().subscribe(data => {
  //     console.log(data);
      
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  delete(element: any){
  //   // console.log(element.idRolLavado);
  //   this.ordenLavadoService.delete(element.idOl).subscribe(data => {
  //     this.toasterService.message("DATO ELIMINADO","cerrar","?")
  //     this.listOrdenes()
  //   })
  }



 

}
