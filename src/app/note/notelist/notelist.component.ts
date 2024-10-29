import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss']
})
export class NotelistComponent implements OnInit {
  user: any;
  list: any[] = [];
  id: any;
  searchForm:any
  currentPage:any = 1
  totalPages:any = 1
  totalDocs:any = 10
  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchList();
    });
    
    // Get the user from the store
    this.store.select('apiCallsStore').pipe(
      map((state:any) => state.response.decryptedObje)
    ).subscribe(user => {
      this.user = user;
    });
  }

   fetchList() {
    const payload = { doctor_id: this.user._id, user_id: this.id };
    // const result = await getPatientHistoryNote(payload);
     this.commonService.getRequest('notes/history',payload).subscribe((response)=>{
      if(response.data.status === 'success'){
        this.list = response.data.data;
      }

    })
  }

  async handleDownload(id: string, type: string) {
    try {
      this.commonService.download(id).subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        if (type === 'print') {
          const printWindow = window.open(url);
  
          if (printWindow) { 
            printWindow.onload = () => {
              printWindow.focus()
              printWindow.print()
            };
          } else {
            console.error('Failed to open print window');
          }
        } else if (type === 'download') {
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'report.pdf'); 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); 
        }
  
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error("Error downloading file:", error);
      });
    } catch (error) {
      console.error("Error in handleDownload:", error);
    }
  }

  onSearch() {
    // Implement search functionality
  }

  resetList() {
    this.searchForm.reset();
    // Reset list or fetch all data
  }

  onPageChange(page: number) {
    this.currentPage = page;
    // Fetch data for the new page
  }

  viewNoteDetail(id: string) {
    // Navigate to note detail view
  }
  
  
}