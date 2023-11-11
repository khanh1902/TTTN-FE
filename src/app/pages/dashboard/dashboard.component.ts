import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DataPoint } from 'src/app/shared/models/chartOptions';
import { RankStudents } from 'src/app/shared/models/rankStudent';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	dataPoint: DataPoint[] = [];
	chartOptions: any;
	chartWidth: number = 500;
	chartHeight: number = 300;
	totalStudents: number = 0;
    totalClasses: number = 0;
    totalSubjects: number = 0;
    totalScores: number = 0;
	rankStudents: RankStudents[] = [];

	@ViewChild("dataTable") table!: DatatableComponent;

	columns = [{ name: 'Top' }, { name: 'Student Id' }, { name: 'Student Name' },{ name: 'Scores' }];
	

	constructor(
		private dashboardService: DashboardService
	) {
		this.chartOptions = {
			width: this.chartWidth, // set the width in pixels
			height: this.chartHeight,
			title: {
				text: "Average Scores"
			},
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			axisY: {
				includeZero: true,
				valueFormatString: "#,##0.00"
			},
			data: [{
				type: "column",
				yValueFormatString: "#,##0.00",
				dataPoints: this.dataPoint
			}],
		};
	}

	ngOnInit(): void {
		this.getChartScores();
		this.getTotalDetails();
		this.getRankStudents();
		console.log(this.rankStudents);
	}

	getChartScores() {
		this.dashboardService.getChartScores().subscribe({
			next: response => {
				this.dataPoint = []; // Clear the array before pushing new data
				for (const label of response.data) {
					this.dataPoint.push(new DataPoint(label.subjectName, label.averageScores));
				}
				this.chartOptions.data[0].dataPoints = this.dataPoint;
				console.log(this.dataPoint);
			},
			error: error => console.log(error),
		});
	}

	getTotalDetails() {
		this.dashboardService.getTotalsDetails().subscribe({
			next: response => {
				this.totalStudents = response.data.totalStudents;
				this.totalClasses = response.data.totalClasses;
				this.totalSubjects = response.data.totalSubjects;
				this.totalScores = response.data.totalScores;
				console.log(response.data);

			},
			error: error => console.log(error),
		});
	}

	getRankStudents() {
		this.dashboardService.getRankStudents().subscribe({
			next: response => {
				this.rankStudents = response.data;
				this.table.recalculate();
				console.log(response.data);

			},
			error: error => console.log(error),
		});
	}
}
