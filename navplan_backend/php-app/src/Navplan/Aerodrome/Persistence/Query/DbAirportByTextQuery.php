<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;


class DbAirportByTextQuery implements IAirportByTextQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Airport[]
     */
    public function search(string $searchText, int $maxResults): array
    {
        $t = new DbTableAirport();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondMulti::any(
                DbCondText::create($t->colIcao(), DbCondOpTxt::LIKE_PREFIX, $searchText),
                DbCondText::create($t->colName(), DbCondOpTxt::LIKE_PREFIX, $searchText)
            ))
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenEquals($t->colCountry(), "CH", "1")
                ->else("2")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenAny([
                    DbCondSimple::equals($t->colIcao(), NULL),
                    DbCondSimple::equals($t->colIcao(), "")
                ], "2")
                ->else("1")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenEquals($t->colType(), "INTL_APT", "1")
                ->whenAny([
                    DbCondSimple::equals($t->colType(), "APT"),
                    DbCondSimple::equals($t->colType(), "AF_CIVIL"),
                    DbCondSimple::equals($t->colType(), "AF_MIL_CIVIL"),
                    DbCondSimple::equals($t->colType(), "AF_WATER"),
                    DbCondSimple::equals($t->colType(), "AD_MIL")
                ], "2")
                ->whenAny([
                    DbCondSimple::equals($t->colType(), "GLIDING"),
                    DbCondSimple::equals($t->colType(), "LIGHT_AIRCRAFT")
                ], "3")
                ->whenAny([
                    DbCondSimple::equals($t->colType(), "HELI_CIVIL"),
                    DbCondSimple::equals($t->colType(), "HELI_MIL")
                ], "4")
                ->else("5")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy($t->colIcao(), DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");
        $converter = new DbAirportConverter($t);

        return $converter->fromDbResult($result);
    }
}
