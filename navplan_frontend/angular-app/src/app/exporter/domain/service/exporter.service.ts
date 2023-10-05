import {Observable} from 'rxjs';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {Track} from '../../../track/domain/model/track';
import {ExportedFile} from '../model/exported-file';
import {IExporterService} from './i-exporter.service';
import {IExporterRepoService} from './i-exporter-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class ExporterService implements IExporterService {
    public constructor(private exporterRepo: IExporterRepoService) {
    }


    public exportPdf(flightroute: Flightroute): Observable<ExportedFile> {
        return this.exporterRepo.exportPdf(flightroute);
    }


    public exportExcel(flightroute: Flightroute): Observable<ExportedFile> {
        return this.exporterRepo.exportExcel(flightroute);
    }


    public exportKml(flightroute: Flightroute, track: Track): Observable<ExportedFile> {
        return this.exporterRepo.exportKml(flightroute, track);
    }


    public exportGpx(flightroute: Flightroute, track: Track): Observable<ExportedFile> {
        return this.exporterRepo.exportGpx(flightroute, track);
    }


    public exportFpl(flightroute: Flightroute): Observable<ExportedFile> {
        return this.exporterRepo.exportFpl(flightroute);
    }
}
