import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent implements OnInit {
  physicians: any[] = [];
  totalDocs: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  errorMessage: string | null = null; 

  constructor(private commonService: CommonService, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.fetchPhysicians(this.currentPage);
  }

  fetchPhysicians(page: number) {
    this.commonService.get(`admin/listPhysicians?page=${page}`).subscribe({
      next: (response: any) => {
        console.log(response, "response")
        this.physicians = response.data.docs;
        this.totalDocs = response.data.totalDocs;
        this.totalPages = response.data.totalPages;
       this.toastrService.success(response.message)
      },
      error: (error) => {
        this.toastrService.error(error);
        
      }
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPhysicians(this.currentPage);
    }
  }
  resetList() {
    this.currentPage = 1; 
    this.fetchPhysicians(this.currentPage);
  }
}
