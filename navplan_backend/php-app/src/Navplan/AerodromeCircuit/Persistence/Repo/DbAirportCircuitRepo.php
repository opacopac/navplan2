<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit\Persistence\Repo;

use Navplan\AerodromeCircuit\Domain\Model\AirportCircuit;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitRepo;
use Navplan\AerodromeCircuit\Persistence\Model\DbAirportCircuitConverter;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Persistence\Model\DbLine2dConverter;
use Navplan\Common\Persistence\Model\DbRing2dConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportCircuitRepo implements IAirportCircuitRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function getCircuitsByIcao(string $adIcao): array {
        $query = "SELECT airportIcao, section, appendix, comment, AsWKT(lines2d) as lines2d FROM ivao_circuits";
        $query .= " WHERE airportIcao=" . $this->dbService->escapeAndQuoteString($adIcao);

        $result = $this->dbService->execMultiResultQuery($query, "error reading circuits by icao");

        return $this->convertCirquits($result);
    }


    public function getCircuitsByExtent(Extent2d $extent): array {
        $extentPoly = DbRing2dConverter::toWktPolygon($extent->toRing2d());
        $query = "SELECT airportIcao, section, appendix, comment, AsWKT(lines2d) as lines2d FROM ivao_circuits";
        $query .= " WHERE ST_INTERSECTS(lines2d, " . $extentPoly . ")";

        $result = $this->dbService->execMultiResultQuery($query, "error reading circuits by extent");

        return $this->convertCirquits($result);
    }


    public function writeCircuit(AirportCircuit $circuit) {
        $query = "INSERT INTO ivao_circuits (airportIcao, section, appendix, comment, lines2d) VALUES (";
        $query .= $this->dbService->escapeAndQuoteString($circuit->airportIcao) . ",";
        $query .= $this->dbService->escapeAndQuoteString($circuit->section) . ",";
        $query .= $this->dbService->escapeAndQuoteString($circuit->name) . ",";
        $query .= $this->dbService->escapeAndQuoteStringOrNull($circuit->comment) . ",";
        $query .= DbLine2dConverter::toWktMultilineString($circuit->line2dList) . ")";

        $this->dbService->execCUDQuery($query, "error writing circuit");
    }


    private function convertCirquits(IDbResult $result): array {
        $circuits = [];
        while ($row = $result->fetch_assoc()) {
            $circuits[] = DbAirportCircuitConverter::fromDbRow($row);
        }

        return $circuits;
    }
}
