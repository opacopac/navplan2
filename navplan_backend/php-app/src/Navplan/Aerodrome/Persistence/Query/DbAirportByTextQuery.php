<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
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
            ->whereAny(
                DbCondText::create(DbTableAirport::COL_ICAO, DbCondOpTxt::LIKE_PREFIX, $searchText),
                DbCondText::create(DbTableAirport::COL_NAME, DbCondOpTxt::LIKE_PREFIX, $searchText)
            )
            ->limit($maxResults)
            ->orderBy(
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals(DbTableAirport::COL_COUNTRY, "CH", "1")
                    ->else("2")
                    ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(
                MySqlDbCaseBuilder::create($this->dbService)
                    ->when(
                        DbCondMulti::create(
                            DbCondCombinator::OR,
                            DbCondSimple::create(DbTableAirport::COL_ICAO, DbCondOp::EQ, NULL),
                            DbCondSimple::create(DbTableAirport::COL_ICAO, DbCondOp::EQ, "")
                        ),
                        "2")
                    ->else("1")
                    ->build(),
                DbSortOrder::ASC
            )
            // TODO: query builder
            ->orderBy(
                "CASE WHEN " . DbTableAirport::COL_TYPE . " = 'INTL_APT' THEN 1"
                . " WHEN " . DbTableAirport::COL_TYPE . " = 'APT'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'AF_CIVIL'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'AF_MIL_CIVIL'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'AF_WATER'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'AD_MIL' THEN 2"
                . " WHEN " . DbTableAirport::COL_TYPE . " = 'GLIDING'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'LIGHT_AIRCRAFT' THEN 3"
                . " WHEN " . DbTableAirport::COL_TYPE . " = 'HELI_CIVIL'"
                . "   OR " . DbTableAirport::COL_TYPE . " = 'HELI_MIL' THEN 4"
                . " ELSE 5 END",
                DbSortOrder::ASC
            )
            ->orderBy(DbTableAirport::COL_ICAO, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");

        return DbAirportConverter::fromDbResult($result);
    }
}
