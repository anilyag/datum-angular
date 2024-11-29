import { createFeature, createReducer, on } from '@ngrx/store';
import { branchAction } from '../actions/branch.action';
import { BranchState, WarehouseState } from '../../interface/stock';
import { warehouseAction } from '../actions/warehouse.action';



export const initialState: WarehouseState = {
  fromWarehouses: [],
  toWarehouses: [],
  loading: false,
  error: null
};

export const warehouseFeature = createFeature({
  name: 'warehouses',
  reducer: createReducer(
    initialState,
    on(warehouseAction.loadFromWarehouses, state => ({ ...state, loading: true })),
    on(warehouseAction.loadFromWarehousesSuccess, (state, { fromWarehouses }) => ({
      ...state,
      fromWarehouses,
      loading: false,
      error: null
    })),
    on(warehouseAction.loadToWarehouses, state => ({ ...state, loading: true })),
    on(warehouseAction.loadToWarehousesSuccess, (state, { toWarehouses }) => ({
      ...state,
      toWarehouses,
      loading: false,
      error: null
    })),
    on(warehouseAction.loadWarehousesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))   
  )
});