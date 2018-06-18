import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AdminOpenBillsComponent } from './admin/admin-open-bills/admin-open-bills.component';
import { AdminPastBillsComponent } from './admin/admin-past-bills/admin-past-bills.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserTabsComponent } from './user/user-tabs/user-tabs.component';
import { UserAccountManagementComponent } from './user/user-account-management/user-account-management.component';

const routes:Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}/*,
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'admin-open-bills', component: AdminOpenBillsComponent},
  {path: 'admin', redirectTo: 'admin-open-bills', pathMatch: 'full'},
  {path: 'admin-open-bills', component: AdminOpenBillsComponent},
  {path: 'admin-past-bills', component: AdminPastBillsComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'admin-user-management', component: AdminUserManagementComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'user', redirectTo: 'user-home', pathMatch: 'full'},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-tabs', component: UserTabsComponent},
  {path: 'user-account-management', component: UserAccountManagementComponent}*/
];

export const routing = RouterModule.forRoot(routes);