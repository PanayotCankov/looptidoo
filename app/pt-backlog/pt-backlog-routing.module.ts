import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PTBacklogComponent } from "./pt-backlog.component";
import { PTItemComponent } from "./pt-item/pt-item.component";

import { PTItemDetailsComponent } from "./pt-item/pt-item-details.component";
import { PTItemTasksComponent } from "./pt-item/pt-item-tasks.component";
import { PTItemChitchatComponent } from "./pt-item/pt-item-chitchat.component";

const backlogRoutes: Routes = [
    {
        path: "pt-backlog",
        component: PTBacklogComponent
    },
    {
        path: "pt-item/:id",
        component: PTItemComponent,
        children: [
            {
                path: "",
                redirectTo: "pt-item-details"
            },
            {
                path: "pt-item-details",
                component: PTItemDetailsComponent
            },
            {
                path: "pt-item-tasks",
                component: PTItemTasksComponent
            },
            {
                path: "pt-item-chitchat",
                component: PTItemChitchatComponent
            }
        ]
    }
];
export const backlogRoutingConfig: ModuleWithProviders = RouterModule.forChild(backlogRoutes);