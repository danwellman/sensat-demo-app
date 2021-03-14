import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { EnterReadingComponent } from '../enter-reading/enter-reading.component';
import { SensorDataService } from '../_services/sensor-data.service';
import { SensorReading } from '../_models/sensor-reading';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<SensorReading>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['id', 'box_id', 'sensor_type', 'name', 'reading_ts'];
  public dataSource: MatTableDataSource<SensorReading>;
  public showSpinner: boolean;
  public error: boolean;
  public errorMessage: string;

  private subs: Subscription[] = []; 

  constructor(
    private readonly sensorDataService: SensorDataService,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.showSpinner = true;
    this.dataSource = new MatTableDataSource();
  }

  public ngAfterViewInit() {
    this.subs.push(this.sensorDataService.getData().subscribe({
      next: (sensorData: SensorReading[]) => {
        this.dataSource.data = sensorData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err;
        this.showSpinner = false;
        this.cd.detectChanges();
      },
    }));
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EnterReadingComponent);

    dialogRef.afterClosed().subscribe((result: SensorReading) => {
      this.dataSource.data.unshift(result);
    });
  }
}
