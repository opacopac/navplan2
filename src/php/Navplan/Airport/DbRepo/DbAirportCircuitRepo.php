<?php declare(strict_types=1);

namespace Navplan\Airport\DbRepo;

use Navplan\Airport\DbModel\DbAirportCircuitConverter;
use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Airport\DomainService\IAirportCircuitRepo;
use Navplan\Common\DbModel\DbLine2dConverter;
use Navplan\Common\DbModel\DbRing2dConverter;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;


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
