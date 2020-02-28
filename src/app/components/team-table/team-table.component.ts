import { Component, OnInit } from "@angular/core";
import { TeamService, TeamsTableHeaders } from "src/app/services/team.service";
import { Observable } from "rxjs";
import { take, count } from "rxjs/operators";
import { Team } from "src/app/interfaces/team";
import { Countries } from "src/app/interfaces/player";

@Component({
  selector: "app-team-table",
  templateUrl: "./team-table.component.html",
  styleUrls: ["./team-table.component.scss"]
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length === 0) {
          const team: Team = {
            name: "My Amazing Team",
            country: Countries.Colombia,
            players: null
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
