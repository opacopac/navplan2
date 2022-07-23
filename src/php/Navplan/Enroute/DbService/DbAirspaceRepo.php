<?php declare(strict_types=1);

namespace Navplan\Enroute\DbService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\DbModel\DbAirspaceConverter;
use Navplan\Enroute\DomainService\IAirspaceRepo;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\MySqlDb\DbHelper;
use Throwable;


class DbAirspaceRepo implements IAirspaceRepo {
    const MAX_BOTTOM_ALT_FL = 200;
    const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_AIRSPACE_DIAMETER;

        $query  = $this->getSelectClauseCommonPart();
        $query .= "  det.polygon";
        $query .= " FROM openaip_airspace2 air";
        $query .= "  INNER JOIN openaip_airspace_detaillevels det ON det.airspace_id = air.id";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air.extent, " . $extent . ")";
        $query .= "    AND";
        $query .= "  (air.alt_bottom_height < " . self::MAX_BOTTOM_ALT_FL . " OR air.alt_bottom_unit <> 'FL')";
        $query .= "    AND";
        $query .= "  air.diameter > " . $minDiameterDeg;
        $query .= "    AND";
        $query .= "  (" . $zoom . " >= det.zoommin AND " . $zoom . "<= det.zoommax)";
        //$query .= "  ST_Distance(ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 1), ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 3)) > " . $minDiameterDeg;
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by extent");

        return DbAirspaceConverter::fromDbResult($result);
    }


    public function searchByRouteIntersection(array $lonLatList): array {
        $query  = $this->getSelectClauseCommonPart();
        $query .= "  air.polygon";
        $query .= " FROM openaip_airspace2 air";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air.extent, " . DbHelper::getDbLineString($lonLatList) . ")";
        $query .= "    AND";
        $query .= "  (air.alt_bottom_height < " . self::MAX_BOTTOM_ALT_FL . " OR air.alt_bottom_unit <> 'FL')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");

        return DbAirspaceConverter::fromDbResult($result);
    }


    public function searchByPosition(Position2d $position2d): array {
        $query  = $this->getSelectClauseCommonPart();
        $query .= "  NULL AS polygon";
        $query .= " FROM openaip_airspace2 air";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air.extent, " . DbHelper::getDbPointStringFromPos($position2d) . ")";
        $query .= "    AND";
        $query .= "  (air.alt_bottom_height < " . self::MAX_BOTTOM_ALT_FL . " OR air.alt_bottom_unit <> 'FL')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");

        return DbAirspaceConverter::fromDbResult($result);
    }




    public function insertAll(array $airspaces): void {
        $statement = DbAirspaceConverter::prepareInsertStatement($this->dbService);
            foreach ($airspaces as $airspace) {
                try {
                    DbAirspaceConverter::bindInsertStatement($airspace, $statement);
                    $statement->execute();
                } catch (Throwable $ex) {
                    $this->loggingService->error("error inserting airspace '" . $airspace->name . "'");
                    throw $ex;
                }
            }
    }


    public function deleteAll(): bool {
        $query = "TRUNCATE TABLE " . DbAirspaceConverter::TABLE_NAME;

        return $this->dbService->execCUDQuery($query);
    }


    private function getSelectClauseCommonPart(): string {
        $query  = "SELECT";
        $query .= "  air.id,";
        $query .= "  air.category,";
        $query .= "  air.country,";
        $query .= "  air.name,";
        $query .= "  air.alt_top_reference,";
        $query .= "  air.alt_top_height,";
        $query .= "  air.alt_top_unit,";
        $query .= "  air.alt_bottom_reference,";
        $query .= "  air.alt_bottom_height,";
        $query .= "  air.alt_bottom_unit,";

        return $query;
    }
}
