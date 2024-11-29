import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBranch, IWarehouse } from '../interface/stock';

@Injectable({
  providedIn: 'root'
})
export class StockIssueService {

  constructor(private http: HttpClient) { }

  getBranch(){

  return  this.http.get<IBranch[]>('https://dev.datuminnovation.com/api/ext/getBranch');
  
  }

  getWarehouse(id:number){

    return  this.http.get<IWarehouse[]>('https://dev.datuminnovation.com/api/ext/BranchWiseWH?branchId='+id);
    
    }

  getNextVNo(id:number){
    return this.http.get('https://dev.datuminnovation.com/api/ext/nextVNo?voucherid=' + id ,{responseType:'text'})
  }

  getVdata(){
    return this.http.get('https://dev.datuminnovation.com/api/ext/LeftGrid?branchId=1&pageId=229&userId=118');
  }

 

}
