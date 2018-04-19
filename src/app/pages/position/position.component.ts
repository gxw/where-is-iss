
/*
* Import angular modules
*/
import {Component, OnInit} from "@angular/core";

/**
 * Import app class
 */
import {Satelite} from "../../shared/satelite/satelite"
import {Position} from "../../shared/position/position"
import {PositionService} from "../../shared/position/position.service"


/**
 * @Component configuration
 */
@Component({
    selector: "my-app",
    providers: [PositionService],
    templateUrl: "./position.html",
    styleUrls: ["./position.css"]
})
/**
 * Declaration PositionComponent, extends class OnInit
 */
export class PositionComponent implements OnInit {

    /**
     * @var Satelite[]
     */    
    sateliteList: Satelite[];
    /**
     * @var Position
     */
    position: Position;

    /**
     * Contructor
     * * @param PositionService positionService
     */
    constructor(private positionService: PositionService) {}
    
    /**
     * Execute getOnePosition / getSatelites ngOnInit life cykle
     */
    ngOnInit() {

        this.getOnePosition();
        this.getSatelites();

    }
    /**
     * Fill Position object
     * return @void
     */
    getOnePosition(): void {
        this.positionService.getPostion(25544).subscribe(position => this.position = position)
    }
    /**
     * Fill Sataelite array
     * return @void
     */
    getSatelites(): void {
        this.positionService.getList().subscribe(list => this.sateliteList = list)
    }
    /**
     * Refresh data via click event
     * return @void
     */
    refreshData(): void {
        this.getOnePosition()
    }

}