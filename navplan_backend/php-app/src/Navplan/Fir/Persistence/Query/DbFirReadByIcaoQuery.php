<?php declare(strict_types=1);

namespace Navplan\Fir\Persistence\Query;

use Navplan\Fir\Domain\Model\Fir;
use Navplan\Fir\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Fir\Persistence\Model\DbFirConverter;
use Navplan\Fir\Persistence\Model\DbTableFir;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbColBuilder;


readonly class DbFirReadByIcaoQuery implements IFirReadByIcaoQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readByIcao(string $icao): ?Fir
    {
        $t = new DbTableFir();

        // We need to use ST_AsText to get the polygon in WKT format
        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colId(),
                $t->colRegion(),
                $t->colIcao(),
                $t->colName(),
                $t->colStateCode(),
                $t->colStateName(),
                $t->colCenterLat(),
                $t->colCenterLon(),
                "ST_AsText(" . MySqlDbColBuilder::buildColName($t->colPolygon()) . ") AS polygon"
            )
            ->where(DbCondSimple::equals($t->colIcao(), $icao))
            ->limit(1)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading FIR by ICAO");

        if ($result->getNumRows() === 0) {
            return null;
        }

        $converter = new DbFirConverter($t);
        $firs = $converter->fromDbResult($result);

        return count($firs) > 0 ? $firs[0] : null;
    }
}
