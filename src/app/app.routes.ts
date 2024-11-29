import { Routes } from '@angular/router';
import { StockIssueComponent } from './pages/stock-issue/stock-issue.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'stock-issue',
        pathMatch: 'full'
    },
    {
        path:'stock-issue',
        component: StockIssueComponent
    }
];
