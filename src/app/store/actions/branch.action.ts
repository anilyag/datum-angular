import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { IBranch } from "../../interface/stock";

export const branchAction = createActionGroup({
    source: 'Branch API',
    events:{
        'Load Branches': emptyProps(),
        'Load Branches Success': props<{branches:IBranch[]}>(),
        'Load Branches Failure': props<{error:string}>()
        
    }
})