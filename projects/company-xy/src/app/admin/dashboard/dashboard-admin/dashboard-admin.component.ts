import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Company, CompanyService, ContactList } from 'projects/lib-core/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdminComponent implements OnInit {
  private ngUnSubscribe: Subject<void>
  public companyList: Company;
  public contactList: [];
  constructor(
    private company: CompanyService) { 
    this.ngUnSubscribe = new Subject<void>();
  }

  /**
   * Method to initialize data
   * @returns void
   */
  public ngOnInit(): void {
    this.company.getCompaniesAndContacts().pipe(
      takeUntil(this.ngUnSubscribe.asObservable())).subscribe((list: any) => {
        [this.companyList, this.contactList] = [list[0], list[1]];
      }), ((error: any) => {
      })
  }
  /**
   * Method to destroy subscription
   * @returns void
   */
  public ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
