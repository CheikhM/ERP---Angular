import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Label, MultiDataSet, Colors } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private toasterService: ToastrService,
              private projectService: ProjectService,
              private notificationService: NotificationService,
              private router: Router){ }

  public projectLabels: Label[] = [];
  public projetctDataset: MultiDataSet = [[]];

  public taskLabels: Label[] = [];
  public taskDataset: MultiDataSet = [[]];

  public bidLabels: Label[] = [];
  public bidDataset: MultiDataSet = [[]];

  public dealLabels: Label[] = [];
  public dealDataset: MultiDataSet = [[]];

  public shartType: ChartType = 'doughnut';
  public colors1 = [
    {
      backgroundColor: [
        'rgba(129, 199, 111, 1)',
        'rgba(118, 183, 172, 1)',
        'rgba(142, 124, 111, 1)',
        'rgba(129, 78, 40, 1)',
    ]
    }
  ];
  public colors2 = [
    {
      backgroundColor: [
        'rgba(129, 199, 111, 1)',
        'rgba(51, 183, 172, 1)',
        'rgba(142, 14, 111, 1)',
        'rgba(129, 78, 40, 1)',
    ]
    }
  ];
  public colors3 = [
    {
      backgroundColor: [
        'rgba(129, 199, 111, 1)',
        'rgba(47, 183, 172, 1)',
        'rgba(142, 124, 111, 1)',
        'rgba(140, 128, 40, 1)',
    ]
    }
  ];
  public colors4 = [
    {
      backgroundColor: [
        'rgba(129, 199, 111, 1)',
        'rgba(118, 183, 172, 1)',
        'rgba(142, 124, 111, 1)',
        'rgba(129, 78, 40, 1)',
    ]
    }
  ];

  ngOnInit() {
    this.getProjectStats();
    this.getTaskStats();
    this.getBidStats();
    this.getDealStats();
  }

  // get statistic for projects
  getProjectStats() {
    this.projectService.groupEntityByStatus('project', 'status').subscribe(res => {
      if(res && res.length) {
        res.forEach(item => {
          this.projectLabels.push(item['status']);
          this.projetctDataset[0].push(item['sum']);
        });
      }
    });
  }

  // get statistic for tasks
  getTaskStats() {
    this.projectService.groupEntityByStatus('task', 'status').subscribe(res => {
      if(res && res.length) {
        res.forEach(item => {
          this.taskLabels.push(item['status']);
          this.taskDataset[0].push(item['sum']);
        });
      }
    });
  }


  // get statistic for tasks
  getBidStats() {
    this.projectService.groupEntityByStatus('bid', 'status').subscribe(res => {
      if(res && res.length) {
        res.forEach(item => {
          this.bidLabels.push(item['status']);
          this.bidDataset[0].push(item['sum']);
        });
      }
    });
  }

    // get statistic for tasks
    getDealStats() {
      this.projectService.groupEntityByStatus('deal', 'status').subscribe(res => {
        if(res && res.length) {
          res.forEach(item => {
            this.dealLabels.push(item['status']);
            this.dealDataset[0].push(item['sum']);
          });
        }
      });
    }

}
