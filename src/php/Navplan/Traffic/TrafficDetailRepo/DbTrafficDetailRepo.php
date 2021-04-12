<?php declare(strict_types=1);

namespace Navplan\Traffic\TrafficDetailRepo;

use Navplan\Db\DomainService\IDbService;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;


class DbTrafficDetailRepo implements ITrafficDetailRepo {
    private $dbService;


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function readDetailsFromLfrCh(array $icao24List): array {
        if (count($icao24List) === 0) {
            return [];
        }

        array_walk(
            $icao24List,
            function (string &$icao24) { $icao24 = $this->dbService->escapeString($icao24); }
        );

        $query = "SELECT icaohex, registration, aircraftModelType, manufacturer FROM lfr_ch";
        $query .= " WHERE icaohex IN ('" . join("','", $icao24List) . "')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching for icao24s in lfr_ch");

        $acDetails = [];
        while ($rs = $result->fetch_assoc()) {
            $acDetails[] = DbTrafficDetail::fromLfrChResult($rs);
        }

        return $acDetails;
    }


    public function readDetailsFromBasestation(array $icao24List): array {
        if (count($icao24List) === 0) {
            return [];
        }

        array_walk(
            $icao24List,
            function (string &$icao24) { $icao24 = $this->dbService->escapeString($icao24); }
        );

        $query = "SELECT mode_s, registration, manufacturer, icao_type_code FROM basestation_aircrafts";
        $query .= " WHERE mode_s IN ('" . join("','", $icao24List) . "')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching for icao24s in basestation_aircrafts");

        $acDetails = [];
        while ($rs = $result->fetch_assoc()) {
            $acDetails[] = DbTrafficDetail::fromBasestationResult($rs);
        }

        return $acDetails;
    }


    public function readDetailsFromIcaoAcTypes(array $acTypeList): array {
        if (count($acTypeList) === 0) {
            return [];
        }

        array_walk(
            $acTypeList,
            function (string &$acType) { $acType = $this->dbService->escapeString($acType); }
        );

        $query = "SELECT designator, model, manufacturer, ac_type, eng_type FROM icao_aircraft_type";
        $query .= " WHERE designator IN ('" . join("','", $acTypeList) . "')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching for ac types in icao_aircraft_types");

        $acDetails = [];
        while ($rs = $result->fetch_assoc()) {
            $acDetails[] = DbTrafficDetail::fromIcaoAcTypeResult($rs);
        }

        return $acDetails;
    }
}
