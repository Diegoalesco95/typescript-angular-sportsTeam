import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/app/interfaces/player";
import { PlayerService } from "src/app/services/player.service";
import { take } from "rxjs/operators";
import { TeamService } from "src/app/services/team.service";

@Component({
  selector: "app-player-table",
  templateUrl: "./player-table.component.html",
  styleUrls: ["./player-table.component.scss"]
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]>;
  public selectedPlayer: Player;
  public showModal = false;
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace("#open-modal");
    });
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace("#open-modal");
    });
  }

  deletePlayer(player: Player) {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        const moddifiedPlayers = teams[0].players
          ? teams[0].players.filter((p: any) => p.key !== player.$key)
          : teams[0].players;
        const formattedTeam = {
          ...teams[0],
          players: [...moddifiedPlayers]
        };
        this.playerService.deletePlayer(player.$key);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog() {
    this.showModal = false;
  }
}
