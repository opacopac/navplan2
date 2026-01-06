<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Model\Fir;
use Navplan\Airspace\Domain\Query\IFirReadByIcaosQuery;
use Navplan\Airspace\Persistence\Model\DbFirConverter;
use Navplan\Airspace\Persistence\Model\DbTableFir;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbColBuilder;


readonly class DbFirReadByIcaosQuery implements IFirReadByIcaosQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param string[] $icaos
     * @return Fir[]
     */
    public function readByIcaos(array $icaos): array
    {
        if (empty($icaos)) {
            return [];
        }

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
            ->where(DbCondIn::create($t->colIcao(), $icaos))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading FIRs by ICAOs");

        if ($result->getNumRows() === 0) {
            return [];
        }

        $converter = new DbFirConverter($t);
        return $converter->fromDbResult($result);
    }
}


