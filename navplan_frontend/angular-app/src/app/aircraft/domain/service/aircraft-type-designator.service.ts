import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IAircraftTypeDesignatorService} from './i-aircraft-type-designator.service';
import {AircraftTypeDesignator} from '../model/aircraft-type-designator';
import {IAircraftTypeDesignatorRepoService} from './i-aircraft-type-designator-repo.service';


@Injectable()
export class AircraftTypeDesignatorService implements IAircraftTypeDesignatorService {
    public constructor(private acTypeDesignatorRepo: IAircraftTypeDesignatorRepoService) {
    }


    public searchTypeDesignatorByText(searchText: string): Observable<AircraftTypeDesignator[]> {
        return this.acTypeDesignatorRepo.searchTypeDesignatorByText(searchText);
    }
}
