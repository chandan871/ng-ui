import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'projects/lib-core/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ApiService } from '../../../services/api-services/api.service';

@Component({
  selector: 'lib-core-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  private ngUnSubscribe: Subject<void>
  /**
   * stores from group value
   */
  orderForm: FormGroup;
  /**
   * stores form array
   */
  public items: FormArray;
  /**
   * stores contact list
   */
  @Input() contactList: any[];

  @Input() comanyId: string;

  constructor( private fb: FormBuilder, private apiService: ApiService) { 
    this.ngUnSubscribe = new Subject<void>();
  }

  /**
   * life cycle hook to initialize data
   * @returns void
   */
  public ngOnInit(): void {
    this.orderForm = this.fb.group({
      items: this.fb.array([this.createItem(null)])
    });
    this.populateData();
}
  /**
   * method to create form
   * @returns void
   */
  private createItem(data: { name: any; country?: any; phone?: any; id?: any; description?: null; price?: null; }): FormGroup {
    data=data||{name:null,description:null, price: null}
    return this.fb.group({
      name: [data.name, Validators.required],
      country: [data.country],
      phone: [data.phone],
      id: [data.id]
    });
  }

  /**
   * method to crate new form fields
   * @returns void
   */
  public addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem(null));
  }
  /**
   * method to populate form fields dynamically
   * @returns void
   */
  private populateData(): void {
    const items = this.orderForm.get('items') as FormArray;
        items.clear();
        this.contactList.forEach(b => {
        if (b.companyId == this.comanyId) {
          items.push(this.createItem(b))
        }
      });
  }

  /**
   * method to remove form data
   * @returns void
   */
  public removeContact(control: { id: { value: any; }; }, index: any): void {
    this.contactList.forEach((item, index) => {
      if (item.id == control.id.value) {
        this.contactList.splice(index, 1)
      }
    })
    this.populateData();
    this.apiService.postContacts(control.id.value).pipe(
      takeUntil(this.ngUnSubscribe.asObservable())).subscribe((data: any) => {
      //TODO: Move line  86 to 91 here if api info is correct
      }), ((error: any) => {
        
      })
  }

  /**
   * method to save contact details
   * @returns void
   */
  public saveContact(name: string, country: string, phone: string): void {
    const userData = {
      name: name,
      country: country,
      phone: phone,
      companyId: this.comanyId
    }
    this.contactList.push(userData);
      this.populateData();
      this.apiService.postContacts(userData).pipe(
        takeUntil(this.ngUnSubscribe.asObservable())).subscribe((data: any) => {
          this.contactList.push(userData) // Update the form with newly added contact, Remove line 107 if correct api info is provided
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
