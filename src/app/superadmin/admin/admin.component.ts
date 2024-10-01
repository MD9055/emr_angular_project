import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  totalDocs: number = 0;
  searchForm: FormGroup;

  constructor(private commonService: CommonService, private fb: FormBuilder,private toastService:ToastrService, private spinnerService : NgxSpinnerService, private router:Router) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadAdminData();

    // Subscribe to search input changes
    this.searchForm.get('search')!.valueChanges.subscribe(value => {
      this.currentPage = 1; // Reset to the first page when searching
      this.loadAdminData();  // Fetch data based on the search input
    });
  }
  showSuccess(message: string, title: string = 'Success', duration: number = 2000) {
    this.toastService.success(message, title, {
      timeOut: duration, // Duration in milliseconds
      progressBar: true,
      closeButton: true
    });
  }

  loadAdminData(): void {
    this.spinnerService.show()
    const searchQuery = this.searchForm.get('search')!.value.trim();
    const query = searchQuery ? `&search=${searchQuery}` : '';
    this.commonService.get(`superadmin/alladmins?page=${this.currentPage}&limit=${this.itemsPerPage}${query}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching admin data:', error);
          this.toastService.error('Failed to load admin data. Please try again.', 'Error');
          return of(null); // Return a safe value to continue
        })
      )
      .subscribe((response: any) => {
        if (response && response.statusCode == 200) {
          this.admins = response.data.docs;
          this.totalPages = response.data.totalPages;
          this.totalDocs = response.data.totalDocs;
          this.spinnerService.hide()
          this.showSuccess(response.message);
        } else {
          this.toastService.warning('No admin data found.');
        }
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAdminData();
    }
  }

  getCurrentMin(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getCurrentMax(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalDocs);
  }

  deleteAdmin(physicianId: any) {
    if (!physicianId) {
        return null;
    }

    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
        let body = { _id: physicianId };
        return this.commonService.put('common/deleteByID', body).subscribe(
            (response: any) => {
                if (response.statusCode === 200) {
                    this.toastService.success(response.message);
                    this.loadAdminData()
                } else {
                    this.toastService.error(response.message || 'Error occurred during deletion.');
                }
            },
            (error) => {
                this.toastService.error(error.error?.message || 'An unexpected error occurred.');
            }
        );
    }

    return null; 
}


editAdmin(_id: any) {
  const compressedId = this.commonService.encodeId(_id); // Compress the ID
  this.router.navigate(['superadmin/add-admin'], { queryParams: { accessId: compressedId } });
}

}
