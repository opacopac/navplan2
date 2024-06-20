import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-flightroute-name-load-save',
    templateUrl: './flightroute-name-load-save.component.html',
    styleUrls: ['./flightroute-name-load-save.component.scss']
})
export class FlightrouteNameLoadSaveComponent implements OnInit {
    @Input() public flightrouteName: string;
    @Input() public flightrouteId: number;
    @Input() public isUserLoggedIn: boolean;
    @Output() public flightrouteNameChange = new EventEmitter<string>();
    @Output() public loadFlightrouteClick = new EventEmitter<null>();
    @Output() public saveFlightrouteClick = new EventEmitter<null>();
    @Output() public saveFlightrouteCopyClick = new EventEmitter<null>();


    ngOnInit() {
    }


    public isLoadButtonEnabled(): boolean {
        return this.isUserLoggedIn;
    }


    public isSaveButtonEnabled(): boolean {
        return this.isUserLoggedIn && this.flightrouteName.length > 0;
    }


    public isSaveCopyButtonEnabled(): boolean {
        return this.isSaveButtonEnabled() && this.flightrouteId > 0;
    }


    public onFlightrouteNameChange(name: string) {
        this.flightrouteNameChange.emit(name);
    }


    public onLoadFlightrouteClick() {
        this.loadFlightrouteClick.emit();
    }


    public onSaveFlightrouteClick() {
        this.saveFlightrouteClick.emit();
    }


    public onSaveFlightrouteCopyClick() {
        this.saveFlightrouteCopyClick.emit();
    }
}
