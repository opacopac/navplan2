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
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAirport::TABLE_NAME)
            ->where(DbCondMulti::any(
                DbCondText::create(DbTableAirport::COL_ICAO, DbCondOpTxt::LIKE_PREFIX, $searchText),
                DbCondText::create(DbTableAirport::COL_NAME, DbCondOpTxt::LIKE_PREFIX, $searchText)
            ))
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenEquals(DbTableAirport::COL_COUNTRY, "CH", "1")
                ->else("2")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenAny([
                    DbCondSimple::equals(DbTableAirport::COL_ICAO, NULL),
                    DbCondSimple::equals(DbTableAirport::COL_ICAO, "")
                ], "2")
                ->else("1")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(MySqlDbCaseBuilder::create($this->dbService)
                ->whenEquals(DbTableAirport::COL_TYPE, "INTL_APT", "1")
                ->whenAny([
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "APT"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "AF_CIVIL"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "AF_MIL_CIVIL"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "AF_WATER"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "AD_MIL")
                ], "2")
                ->whenAny([
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "GLIDING"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "LIGHT_AIRCRAFT")
                ], "3")
                ->whenAny([
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "HELI_CIVIL"),
                    DbCondSimple::equals(DbTableAirport::COL_TYPE, "HELI_MIL")
                ], "4")
                ->else("5")
                ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(DbTableAirport::COL_ICAO, DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");

        return DbAirportConverter::fromDbResult($result);
    }
}
