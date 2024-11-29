import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBranch, IstockIssue, IVoucherData, IWarehouse } from '../../interface/stock';
import { HttpClient } from '@angular/common/http';
import { StockIssueService } from '../../services/stock-issue.service';
import { generate, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBranches } from '../../store/selectors/branch.selector';
import { branchAction } from '../../store/actions/branch.action';
import { warehouseAction } from '../../store/actions/warehouse.action';
import { selectFromWarehouses,selectToWarehouses} from '../../store/selectors/warehouse.selector';

@Component({
  selector: 'app-stock-issue',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, DatePipe, AsyncPipe],
  templateUrl: './stock-issue.component.html',
  styleUrl: './stock-issue.component.css'
})
export class StockIssueComponent implements OnInit {

  stockIssueSrvc = inject(StockIssueService);

  formValue: IstockIssue | null = null;
  branchList: IBranch[] = [];
  fromWarehouseList: IWarehouse[] = [];
  toWarehouseList: IWarehouse[] = [];
  voucherList: IVoucherData[] = [];
  
  //branches$?:Observable<IBranch[]>

  voucherId: number = 86;
  nextVoucherNo: string | undefined;


  stockIssueForm: FormGroup = new FormGroup({
    voucherNo: new FormControl('', [Validators.required]),
    voucherDate: new FormControl(null, [Validators.required]),
    fromBranch: new FormControl(''),
    toBranch: new FormControl(''),
    fromWarehouse: new FormControl(''),
    toWarehouse: new FormControl(''),
    description: new FormControl(''),
    terms: new FormControl('')
  })
  //datePipe = inject(DatePipe);

  branches$?:Observable<IBranch[]>
  fromWarehouses$?:Observable<IWarehouse[]>
  toWarehouses$?:Observable<IWarehouse[]>

  constructor(private store:Store){
    this.branches$ = store.select(selectBranches);
    this.fromWarehouses$ = store.select(selectFromWarehouses);
    this.toWarehouses$ = store.select(selectToWarehouses);
  }

  ngOnInit(): void {
    this.getAllBranches();    
    this.getNextVoucherNo();
    // this.stockIssueForm.get('fromBranch')?.valueChanges.subscribe(id=>{
    //   this.getBranchWiseWh(id,'fromWarehouse','fromWarehouseList')
    // });
    // this.stockIssueForm.get('toBranch')?.valueChanges.subscribe(id=>{
    //   this.getBranchWiseWh(id,'toWarehouse','toWarehouseList')
    // }) 
    this.getAllVoucherData();  
    
    this.stockIssueForm.get('fromBranch')?.valueChanges.subscribe(id=>{
      this.getWarehousesByBranchId(id,'fromWarehouse')
    });

    this.stockIssueForm.get('toBranch')?.valueChanges.subscribe(id=>{
      this.getWarehousesByBranchId(id,'toWarehouse')
    });
}    

  onNew(){
    this.stockIssueForm.get('voucherNo')?.setValue(this.nextVoucherNo);
  }

  onSave() {
    this.formValue = this.stockIssueForm.value as IstockIssue;
    this.stockIssueForm.reset();
  }

  getAllBranches() {
    // this.stockIssueSrvc.getBranch().subscribe((res: IBranch[]) => {
    //   this.branchList = res;
    // })

    this.store.dispatch(branchAction.loadBranches())

    this.stockIssueSrvc.getBranch().pipe(
      map(branches => {
        this.store.dispatch(branchAction.loadBranchesSuccess({branches}))
      })
    ).subscribe();
  }

  // getBranchWiseWh(id:number, whControlName:string, whListName: string) {
  //   this.stockIssueSrvc.getWarehouse(id).subscribe((res: IWarehouse[]) => {
  //     if(whListName === 'fromWarehouseList'){
  //     this.fromWarehouseList = res;
  //     }else{
  //       this.toWarehouseList = res;
  //     }

  //     const defaultWh = res.find(wh=>wh.isDefault)
  //     if(defaultWh){
  //       this.stockIssueForm.get(whControlName)?.setValue(defaultWh.id);
       
  //     }

  //   })
  // }

  getAllVoucherData(){
    this.stockIssueSrvc.getVdata().subscribe((res:any)=>{
      this.voucherList = res;
      this.voucherList.sort((a,b)=> a.serialNo - b.serialNo)
    })
  }

  
  getNextVoucherNo(){
    this.stockIssueSrvc.getNextVNo(this.voucherId).subscribe((res:string)=>{
    
      this.nextVoucherNo = res;
    
    })
  }
  
  onVoucherClick(voucher:IVoucherData){
    const dateObj = new Date(voucher.date);
    const dateOnly = dateObj.toISOString().split('T')[0];
    this.stockIssueForm.get('voucherNo')?.setValue(voucher.transactionNo);    
    this.stockIssueForm.get('voucherDate')?.setValue(dateOnly);    
  }

  getWarehousesByBranchId(id:number,whFromTo:string){
    if(whFromTo === 'fromWarehouse'){
    this.store.dispatch(warehouseAction.loadFromWarehouses());
    this.stockIssueSrvc.getWarehouse(id).pipe(
      map(fromWarehouses => {
        this.store.dispatch(warehouseAction.loadFromWarehousesSuccess({fromWarehouses}))
      })
    ).subscribe()}
    else if(whFromTo === 'toWarehouse'){
      this.store.dispatch(warehouseAction.loadToWarehouses());
      this.stockIssueSrvc.getWarehouse(id).pipe(
        map(toWarehouses => {
          this.store.dispatch(warehouseAction.loadToWarehousesSuccess({toWarehouses}))
        })
      ).subscribe()}

  }
 
 
}



