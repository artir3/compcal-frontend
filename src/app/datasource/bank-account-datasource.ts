import { BankAccount } from "../models/models";
import { DataSource } from "@angular/cdk/table";
import { MatPaginator, MatSort } from "@angular/material";
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UserService } from "../services/user.service";

/**
 * Data source for the BankAccount view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BankAccountDataSource extends DataSource<BankAccount> {
  
    constructor(private data: BankAccount[]) {
      super();
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<BankAccount[]> {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      const dataMutations = [
        observableOf(this.data),
      ];
  
      return merge(...dataMutations).pipe(map(() => {
        return [...this.data];
      }));
    }
  
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}
}