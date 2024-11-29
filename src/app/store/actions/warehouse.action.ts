import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { IWarehouse } from "../../interface/stock";

export const warehouseAction = createActionGroup({
    source: 'Warehouse API',
    events:{
        'Load FromWarehouses': emptyProps(),
        'Load ToWarehouses': emptyProps(),
        'Load FromWarehouses Success': props<{fromWarehouses:IWarehouse[]}>(),
        'Load ToWarehouses Success': props<{toWarehouses:IWarehouse[]}>(),
        'Load Warehouses Failure': props<{error:string}>()        
    }
})