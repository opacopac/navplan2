<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Aerodrome\Domain\Query\IAirportByExtentQuery;
use Navplan\Aerodrome\Persistence\Model\DbShortAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\Aerodrome\Persistence\Model\DbTableMapFeatures;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbJoinType;


readonly class DbAirportByExtentQuery implements IAirportByExtentQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return ShortAirport[]
     */
    public function searchShortAirports(Extent2d $extent, int $zoom): array
    {
        $tAd = new DbTableAirport("ad");
        $tRwy = new DbTableAirportRunway("rwy");
        $tRwy2 = new DbTableAirportRunway();
        $tFeat = new DbTableMapFeatures("fea");

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $tAd,
                $tAd->colId(),
                $tAd->colType(),
                $tAd->colIcao(),
                $tAd->colLatitude(),
                $tAd->colLongitude(),
                $tRwy->colDirection(),
                $tRwy->colSurface(),
                "GROUP_CONCAT(fea.type) as features" // TODO
            )
            ->join(DbJoinType::LEFT, $tRwy, $tRwy->colAirportId(), $tAd->colId())
            ->join(DbJoinType::LEFT, $tFeat, $tFeat->colAdIcao(), $tAd->colIcao())
            ->where(
                DbCondMulti::all(
                    DbCondGeo::create($tAd->colLonLat(), DbCondOpGeo::INTERSECTS_ST, $extent),
                    DBCondSimple::create($tAd->colZoomMin(), DbCondOp::LT_OR_E, $zoom),
                    DbCondMulti::any(
                        DbCondSimple::equals($tRwy->colId(), null),
                        DbCondMulti::all(
                            DbCondSimple::equals($tRwy->colOperations(), AirportRunwayOperations::ACTIVE->value),
                            DbCondSimple::equals($tRwy->colLength(), DbExp::fromString("(" .
                                $this->dbService->getQueryBuilder()
                                    ->selectFrom($tRwy2, "MAX(length)") // TODO
                                    ->whereEquals($tRwy2->colAirportId(), $tAd->colId())
                                    ->build()
                                . ")"))
                        )
                    )
                )
            )
            ->groupBy($tAd->colId())
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by extent");
        $converter = new DbShortAirportConverter($tAd, $tRwy);

        return $converter->fromDbResult($result);
    }
}
