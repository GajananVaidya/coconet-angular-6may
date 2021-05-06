import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login';
import { AuthGuardService as AuthGuard } from './service';
import { SettingsComponent } from './settings';
const routes: Routes = [
  { path: '', redirectTo: 'indent-requests', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'indent-requests', loadChildren: () => import('./indent-requests').then(x => x.IndentRequestModule), canActivate: [AuthGuard] },
  // { path: 'my-requests', redirectTo: 'indent-requests', pathMatch: 'full' },
  // { path: 'my-approval-requests', redirectTo: 'indent-requests', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'indent-requests', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
