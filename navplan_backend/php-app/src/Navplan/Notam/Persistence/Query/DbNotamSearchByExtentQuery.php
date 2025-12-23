<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Airspace\Persistence\Model\DbTableFir;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Common\GeoHelper;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Persistence\Model\DbTableNotam;
use Navplan\Notam\Persistence\Model\DbTableNotamGeometry;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbJoinType;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbColBuilder;


readonly class DbNotamSearchByExtentQuery implements INotamSearchByExtentQuery
{
    private const int NOTAM_MAX_BOTTOM_FL = 195;
    private const int MIN_PIXEL_NOTAMAREA_DIAMETER = 30;


    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @param TimestampInterval $interval
     * @return Notam[]
     */
    public function searchByExtent(Extent2d $extent, int $zoom, TimestampInterval $interval): array
    {
        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_NOTAMAREA_DIAMETER;
        $icaoList = $this->loadFirAndAdIcaoListByExtent($extent);

        if (empty($icaoList)) {
            return [];
        }

        $t = new DbTableNotam('ntm');
        $tGeo = new DbTableNotamGeometry('geo');
        $tAd = new DbTableAirport('ad');
        $tFir = new DbTableFir('fir');

        $maxTimestampStr = DbHelper::getDbUtcTimeString($interval->end->toMs());
        $minTimestampStr = DbHelper::getDbUtcTimeString($interval->start->toMs());

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colId(),
                $t->colNotam(),
                $tGeo->colGeometry(),
                "ST_AsText(" . MySqlDbColBuilder::buildColName($tGeo->colExtent()) . ") AS extent"
            )
            ->join(DbJoinType::INNER, $tGeo, $tGeo->colIcaoNotamId(), $t->colId())
            ->join(DbJoinType::LEFT, $tAd, $tAd->colId(), $t->colIcao())
            ->join(DbJoinType::LEFT, $tFir, $tFir->colIcao(), $t->colIcao())
            ->where(DbCondMulti::all(
                DbCondIn::create($t->colIcao(), $icaoList),
                DbCondSimple::create($t->colStartDate(), DbCondOp::LT_OR_E, $maxTimestampStr),
                DbCondSimple::create($t->colEndDate(), DbCondOp::GT_OR_E, $minTimestampStr),
                DbCondGeo::create($tGeo->colExtent(), DbCondOpGeo::INTERSECTS_ST, $extent),
                DbCondSimple::create($tGeo->colDiameter(), DbCondOp::GT, $minDiameterDeg),
                DbCondSimple::create($tGeo->colZoomMin(), DbCondOp::LT_OR_E, $zoom),
                DbCondSimple::create($tGeo->colZoomMax(), DbCondOp::GT_OR_E, $zoom)
            ))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading notams");
        $notamList = DbNotamResultHelper::readNotamFromResultList($result);
        $areaNotamList = $this->removeNonAreaNotams($notamList);

        return $areaNotamList;
    }


    /**
     * @param Extent2d $extent
     * @return string[]
     */
    private function loadFirAndAdIcaoListByExtent(Extent2d $extent): array
    {
        $extentSql = DbHelper::getDbPolygonString($extent);
        $query = "SELECT DISTINCT icao FROM icao_fir WHERE ST_INTERSECTS(polygon, " . $extentSql . ") AND icao <> ''";
        $query .= " UNION ";
        $query .= "SELECT DISTINCT icao FROM openaip_airports WHERE ST_INTERSECTS(lonlat, " . $extentSql . ") AND icao <> ''";

        $result = $this->dbService->execMultiResultQuery($query, "error reading fir/ad icao list");

        $icaoList = [];
        while ($row = $result->fetch_assoc()) {
            $icaoList[] = $row["icao"];
        }

        return $icaoList;
    }


    /**
     * @param Notam[] $notamList
     * @return Notam[]
     */
    private function removeNonAreaNotams(array $notamList): array
    {
        return array_filter(
            $notamList,
            fn (Notam $notam) => $notam->isAreaNotam()
        );
    }
}
