import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
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
  @ViewChild(MatTable) public table: MatTable<SensorReading>;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild('primaryInput', { static: false }) public primaryInput: ElementRef;
  @ViewChild('secondaryInput', { static: false }) public secondaryInput: ElementRef;

  public displayedColumns: string[] = ['id', 'box_id', 'sensor_type', 'name', 'reading_ts'];
  public dataSource: MatTableDataSource<SensorReading>;
  public showSpinner: boolean;
  public error: boolean;
  public errorMessage: string;
  public showFilterError: boolean;

  private subs: Subscription[] = [];
  private originalData: SensorReading[];

  constructor(
    private readonly sensorDataService: SensorDataService,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.showSpinner = true;
    this.dataSource = new MatTableDataSource();
  }

  public ngAfterViewInit(): void {
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
    this.showFilterError = false;
    this.originalData = this.dataSource.data;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.resetPagination();
  }

  public applySecondaryFilter(event: Event): void {
    if (!this.primaryInput.nativeElement.value) {
      this.showFilterError = true;
      this.secondaryInput.nativeElement.value = '';
      return;
    };

    const dataFilteredByPrimary = this.dataSource.filteredData;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = dataFilteredByPrimary;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.resetPagination();
  }

  public resetFilter(): void {
    if (this.dataSource.filter) {
      this.dataSource.filter = '';
      this.dataSource.data = this.originalData;
      this.primaryInput.nativeElement.value = '';
      this.secondaryInput.nativeElement.value = '';
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EnterReadingComponent);

    dialogRef.afterClosed().subscribe((result: SensorReading) => {
      this.dataSource.data.unshift(result);

      if (this.originalData) this.originalData.unshift(result);
    });
  }

  private resetPagination(): void {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
