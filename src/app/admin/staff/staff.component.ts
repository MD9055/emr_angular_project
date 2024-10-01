import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';
  totalDocs: number = 0; // New property to track total items
  totalPages: any;

  constructor(private commonService: CommonService, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.fetchStaff();
  }

  fetchStaff(): void {
    const params = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      search: this.searchQuery
    };

    this.commonService.get(`admin/listAdminStaff?page=${params.page}&limit=${params.limit}&search=${params.search}`).subscribe({
      next: (response:any) => {
        if(response.statusCode == 200){
          this.staffList = response.data.docs;
          this.totalDocs = response.data.totalDocs; // Update total items
          this.totalPages = response.data.totalPages;
          this.toastrService.success(response.message)
        }else{
          this.toastrService.error("Error in fetching records")
        }
      },
      error: (error) => {
        console.error('Error fetching staff:', error);
      }
    });
  }

  onSearchChange(search: string): void {
    this.searchQuery = search;
    this.currentPage = 1; // Reset to first page on search
    this.fetchStaff();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchStaff();
  }

  // get totalPages(): number {
  //   return Math.ceil(this.totalItems / this.itemsPerPage); // Calculate total pages
  // }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchStaff();
    }
  }

  getCurrentMin(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getCurrentMax(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalDocs);
  }
  

}
