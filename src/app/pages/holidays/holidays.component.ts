import { AfterViewInit, ViewChild ,Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HolidayService } from './holiday.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { FormNewHolidayComponent } from './form-new-holiday/form-new-holiday.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [FormNewHolidayComponent, MatIconModule, MatButtonModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule],
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.css'
})
export class HolidaysComponent implements OnInit{

  private dialog = inject(MatDialog);
  private holidayService = inject(HolidayService)
  displayedColumns: string[] = ['date', 'description', "estatus", 'options'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getHolidays()
  }


  getHolidays(){
    this.holidayService.getAll().subscribe(data => {
      console.log(data.data);
      
      this.dataSource = data.data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      
    })

  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(){
    
    let dialogRef = this.dialog.open(FormNewHolidayComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'creado'){
        this.getHolidays()
      }
      console.log(`Dialog result: ${result}`); // Pizza!
    });
    
  }

  edit(element:any){
    let dialogRef = this.dialog.open(FormNewHolidayComponent, {
      height: '400px',
      width: '600px',
      data:element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'creado'){
        this.getHolidays()
      }
    });
    

  }


  delete(element:any){
    this.holidayService.delete(element.idHoliday).subscribe(data => {
      this.getHolidays()
    })
  }

}
