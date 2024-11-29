import { createSelector } from '@ngrx/store';
import { branchFeature } from '../reducers/branch.reducer';

export const selectBranchesState = branchFeature.selectBranchesState;
export const selectBranches = createSelector(
  selectBranchesState,
  (state) => state.branches
);
export const selectBranchesLoading = createSelector(
  selectBranchesState,
  (state) => state.loading
);
export const selectBranchesError = createSelector(
  selectBranchesState,
  (state) => state.error
);