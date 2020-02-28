import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { PlayerService } from "./services/player.service";
import { TeamService } from "./services/team.service";
import { TeamTableComponent } from "./components/team-table/team-table.component";
import { PlayerTableComponent } from "./components/player-table/player-table.component";
import { PlayerDialogComponent } from "./components/player-dialog/player-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    PlayerTableComponent,
    PlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [PlayerService, TeamService],
  bootstrap: [AppComponent]
})
export class AppModule {}
