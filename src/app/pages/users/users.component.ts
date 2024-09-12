import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AlertService } from '../../components/alert/alert.service';

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
    'estatus',
    // 'chasis',
    // 'estatusLavado',
    'opciones' 
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private router:Router,
    private userService:UserService,
    private snack:AlertService
  ) { 
    
    
  }

  ngOnInit(): void {
    this.get()
    
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

  get(){
    this.userService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }

  edit(element: any){
    console.log(element);
    this.router.navigate(["/usuarios/editar/"+element.idUsuario])
  }


  activate(element:any){
    this.userService.activarUsuario(element.idUsuario).subscribe(data => {
      this.get()
      this.snack.openSnackBar("Usuario activado")
    })
    
  }

  delete(element: any){
    this.userService.delete(element.idUsuario).subscribe(data => {
      this.get()
      this.snack.openSnackBar("Usuario desactivado")
    })
  }



 

}
