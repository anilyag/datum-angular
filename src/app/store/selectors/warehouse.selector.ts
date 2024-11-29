import { createSelector } from '@ngrx/store';
import { warehouseFeature } from '../reducers/warehouse.reducer';

export const selectWarehousesState = warehouseFeature.selectWarehousesState;
export const selectFromWarehouses = createSelector(
  selectWarehousesState,
  (state) => state.fromWarehouses
);
export const selectToWarehouses = createSelector(
  selectWarehousesState,
  (state) => state.toWarehouses
);
export const selectWarehouseLoading = createSelector(
  selectWarehousesState,
  (state) => state.loading
);
export const selectWarehousesError = createSelector(
  selectWarehousesState,
  (state) => state.error
);