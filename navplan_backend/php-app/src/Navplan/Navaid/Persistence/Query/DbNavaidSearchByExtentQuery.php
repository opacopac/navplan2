<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


readonly class DbNavaidSearchByExtentQuery implements INavaidSearchByExtentQuery
{
    public function __construct(private IDbService $dbService)
    {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array
    {
        $t = new DbTableNavaid();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondMulti::all(
                DbCondGeo::create($t->colLonLat(), DbCondOpGeo::INTERSECTS_ST, $extent),
                DbCondSimple::create($t->colZoomMin(), DbCondOp::LT_OR_E, $zoom),
            ))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by extent");
        $converter = new DbNavaidConverter($t);

        return $converter->fromDbResult($result);
    }
}
