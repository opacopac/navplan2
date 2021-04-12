<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DbRepo;

use Navplan\Db\DomainService\IDbService;
use Navplan\Geometry\DomainModel\Extent;
use Navplan\MeteoSma\DomainService\IMeteoRepo;
use Navplan\System\DomainService\ITimeService;


class DbMeteoRepo implements IMeteoRepo {
    public function __construct(
        private IDbService $dbService,
        private ITimeService $timeService
    ) {
    }


    public function readSmaMeasurements(Extent $extent): array {
        $query = "SELECT DISTINCT";
        $query .= " sta.station_id AS station_id,";
        $query .= " sta.name AS station_name,";
        $query .= " sta.latitude AS station_lat,";
        $query .= " sta.longitude AS station_lon,";
        $query .= " sta.altitude_m AS station_alt_m,";
        $query .= " mea.measurement_time AS measurement_time,";
        $query .= " mea.temp_c AS temp_c,";
        $query .= " mea.sun_min AS sun_min,";
        $query .= " mea.precip_mm AS precip_mm,";
        $query .= " mea.wind_dir AS wind_dir,";
        $query .= " mea.wind_speed_kmh AS wind_speed_kmh,";
        $query .= " mea.wind_gusts_kmh AS wind_gusts_kmh,";
        $query .= " mea.qnh_hpa AS qnh_hpa,";
        $query .= " mea.humidity_pc AS humidity_pc";
        $query .= " FROM meteo_sma_measurements mea";
        $query .= " INNER JOIN meteo_sma_stations sta ON sta.station_id = mea.station_id";
        $query .= " WHERE latitude >= " . $extent->minPos->latitude . " AND latitude <= " . $extent->maxPos->latitude
            . " AND longitude >= " . $extent->minPos->longitude . " AND longitude <= " . $extent->maxPos->longitude;
        $result = $this->dbService->execMultiResultQuery($query, "error reading sma measurements");

        $measurementList = [];
        while ($rs = $result->fetch_assoc()) {
            $measurementList[] = SmaMeasurementConverter::fromDbResult($rs, $this->timeService);
        }

        return $measurementList;
    }


    public function replaceSmaStations(array $smaStationList): void {
        $query = "TRUNCATE TABLE meteo_sma_stations";
        $this->dbService->execCUDQuery($query, "Error deleting SMA stations");

        foreach ($smaStationList as $smaStation) {
            $query = SmaStationConverter::toInsertQuery($this->dbService, $smaStation);
            $this->dbService->execCUDQuery($query, "Error inserting SMA station");
        }
    }
}
