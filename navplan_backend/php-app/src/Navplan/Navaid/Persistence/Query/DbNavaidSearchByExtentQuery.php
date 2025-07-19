<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;


class DbNavaidSearchByExtentQuery implements INavaidSearchByExtentQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableNavaid::TABLE_NAME)
            ->whereAll(
                DbWhereGeo::create(DbTableNavaid::COL_LONLAT, DbWhereOpGeo::INTERSECTS_ST, $extent),
                DbWhereSimple::create(DbTableNavaid::COL_ZOOMMIN, DbWhereOp::LT_OR_E, $zoom),
            )
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by extent");

        return DbNavaidConverter::fromDbResult($result);
    }
}
