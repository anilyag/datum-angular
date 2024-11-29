import { createFeature, createReducer, on } from '@ngrx/store';
import { branchAction } from '../actions/branch.action';
import { BranchState } from '../../interface/stock';



export const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null
};

export const branchFeature = createFeature({
  name: 'branches',
  reducer: createReducer(
    initialState,
    on(branchAction.loadBranches, state => ({ ...state, loading: true })),
    on(branchAction.loadBranchesSuccess, (state, { branches }) => ({
      ...state,
      branches,
      loading: false,
      error: null
    })),
    on(branchAction.loadBranchesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))   
  )
});