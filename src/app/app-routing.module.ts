import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./public/public.module").then(m => m.PublicModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./claims-management/claims-management.module").then(m => m.ClaimsManagementModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
