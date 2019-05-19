<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Shared\StringNumberService;


class TrafficDetails {
    public static function getDetails(array $args, IDbService $dbService, IHttpResponseService $httpService) {
        $dbService->openDb();

        $callback = isset($args["callback"]) ? StringNumberService::checkString($args["callback"], 1, 50) : NULL;

        if (!isset($args["aclist"]) || count($args["aclist"]) === 0) {
            throw new InvalidArgumentException('parameter aclist is missing or empty');
        }

        $acMap = self::parseCheckInputToAcMap($args["aclist"], $dbService);

        self::addDetailsFromLfrCh($acMap, $dbService);
        self::addDetailsFromBasestation($acMap, $dbService);
        self::addDetailsFromIcaoAcTypes($acMap, $dbService);

        $acList = self::getAcListFromMap($acMap);
        RequestResponseHelper::sendArrayResponseWithRoot($httpService,"acdetails", $acList, $callback);

        $dbService->closeDb();
    }


    private static function parseCheckInputToAcMap(array $acList, IDbService $dbService): array {
        $parsedAcList = array();
        foreach ($acList as $ac) {
            $parsedAc = self::parseCheckAc($ac, $dbService);
            $icao24 = $parsedAc["icao24"];
            $parsedAcList[$icao24] = $parsedAc;
        }

        return $parsedAcList;
    }


    private static function parseCheckAc(array $ac, IDbService $dbService): array {
        if (!$ac["icao24"]) {
            throw new InvalidArgumentException('icao24 is missing');
        }

        return array(
            "icao24" => StringNumberService::checkEscapeAlphaNumeric($dbService, strtoupper($ac["icao24"]), 1, 6),
            "reg" => NULL,
            "model" => NULL,
            "manufacturer" => NULL,
            "ac_type" => isset($ac["ac_type"]) ? StringNumberService::checkEscapeAlphaNumeric($dbService, strtoupper($ac["ac_type"]), 1, 4) : NULL,
            "ac_class" => NULL,
            "eng_class" => NULL
        );
    }


    private static function getAcListFromMap(array $acMap): array {
        $acList = [];
        foreach ($acMap as $icao24 => $ac) {
            array_push($acList, $ac);
        }

        return $acList;
    }


    private static function addDetailsFromLfrCh(array &$acMap, IDbService $dbService) {
        $icao24List = self::getIcao24List($acMap);

        if (count($icao24List) === 0) {
            return;
        }

        $query = "SELECT icaohex, registration, aircraftModelType, manufacturer FROM lfr_ch";
        $query .= " WHERE icaohex IN ('" . join("','", $icao24List) . "')";

        $result = $dbService->execMultiResultQuery($query, "error searching for icao24s in lfr_ch");

        while ($row = $result->fetch_assoc()) {
            $ac = &$acMap[$row["icaohex"]];
            $ac["reg"] = $row["registration"];
            $ac["model"] = $row["aircraftModelType"];
            $ac["manufacturer"] = $row["manufacturer"];
        }
    }


    private static function addDetailsFromBasestation(array &$acMap, IDbService $dbService) {
        $icao24List = self::getIcao24List($acMap);

        if (count($icao24List) === 0) {
            return;
        }

        $query = "SELECT mode_s, registration, manufacturer, icao_type_code FROM basestation_aircrafts";
        $query .= " WHERE mode_s IN ('" . join("','", $icao24List) . "')";

        $result = $dbService->execMultiResultQuery($query, "error searching for icao24s in basestation_aircrafts");

        while ($row = $result->fetch_assoc()) {
            $ac = &$acMap[$row["mode_s"]];
            if (!$ac["reg"]) {
                $ac["reg"] = $row["registration"];
            }
            if (!$ac["manufacturer"]) {
                $ac["manufacturer"] = $row["manufacturer"];
            }
            if ($row["icao_type_code"] !== '0000') {
                $ac["ac_type"] = $row["icao_type_code"];
            }
        }
    }


    private static function addDetailsFromIcaoAcTypes(array &$acMap, IDbService $dbService) {
        $acTypeList = self::getIcaoAcTypeList($acMap);

        if (count($acTypeList) === 0) {
            return;
        }

        $query = "SELECT designator, model, manufacturer, ac_type, eng_type FROM icao_aircraft_type";
        $query .= " WHERE designator IN ('" . join("','", $acTypeList) . "')";

        $result = $dbService->execMultiResultQuery($query, "error searching for ac types in icao_aircraft_types");

        $acTypeLookup = array();
        while ($row = $result->fetch_assoc()) {
            $acType = $row['designator'];
            if (isset($acTypeLookup[$acType])) {
                // use ac_type instead of model in case of multiple entries (always different)
                $acTypeLookup[$acType]['model'] = NULL;

                // remove manufacturer in case of multiple different entries
                if ($acTypeLookup[$acType]['manufacturer'] !== $row['manufacturer']) {
                    $acTypeLookup[$acType]['manufacturer'] = NULL;
                }

                continue;
            }
            $acTypeLookup[$acType] = $row;
        }

        foreach ($acMap as $icao24 => &$ac) {
            if (!isset($ac["ac_type"]) || !isset($acTypeLookup[$ac["ac_type"]])) {
                continue;
            }
            $acTypeRow = $acTypeLookup[$ac["ac_type"]];

            if (!$ac['model']) {
                $ac['model'] = $acTypeRow['model'];
            }

            if (!$ac['manufacturer'] && $acTypeRow['manufacturer'] !== NULL) {
                $ac['manufacturer'] = $acTypeRow['manufacturer'];
            }

            $ac['ac_class'] = $acTypeRow['ac_type'];
            $ac['eng_class'] = $acTypeRow['eng_type'];
        }
    }


    private static function getIcao24List(array $acList): array {
        $icao24List = [];

        foreach ($acList as $icao24 => $ac) {
            $value = $ac['icao24'];
            if ($value) {
                array_push($icao24List, $value);
            }
        }

        return $icao24List;
    }


    private static function getIcaoAcTypeList(array $acList): array {
        $acTypeList = [];

        foreach ($acList as $icao24 => $ac) {
            $value = $ac['ac_type'];
            if ($value) {
                array_push($acTypeList, $value);
            }
        }

        return $acTypeList;
    }
}
