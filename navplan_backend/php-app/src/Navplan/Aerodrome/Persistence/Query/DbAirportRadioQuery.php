<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Query\IAirportRadioQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRadioConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;


class DbAirportRadioQuery implements IAirportRadioQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param int $airportId
     * @return AirportRadio[]
     */
    public function read(int $airportId): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                DbTableAirportRadio::TABLE_NAME,
                DbTableAirportRadio::COL_CATEGORY,
                DbTableAirportRadio::COL_FREQUENCY,
                DbTableAirportRadio::COL_TYPE,
                DbTableAirportRadio::COL_NAME,
                DbTableAirportRadio::COL_IS_PRIMARY,
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals(DbTableAirportRadio::COL_CATEGORY, "COMMUNICATION", "1")
                    ->whenEquals(DbTableAirportRadio::COL_CATEGORY, "OTHER", "2")
                    ->whenEquals(DbTableAirportRadio::COL_CATEGORY, "INFORMATION", "3")
                    ->else("4")
                    ->build() . " AS sortorder1",
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals(DbTableAirportRadio::COL_TYPE, "TOWER", "1")
                    ->whenEquals(DbTableAirportRadio::COL_TYPE, "CTAF", "2")
                    ->whenEquals(DbTableAirportRadio::COL_TYPE, "OTHER", "3")
                    ->else("4")
                    ->build() . " AS sortorder2"
            )
            ->whereEquals(DbTableAirportRadio::COL_AIRPORT_ID, $airportId)
            ->orderBy("sortorder1", DbSortOrder::ASC)
            ->orderBy("sortorder2", DBSortOrder::ASC)
            ->orderBy(DbTableAirportRadio::COL_FREQUENCY, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading radios for airport id " . $airportId);

        return DbAirportRadioConverter::fromDbResult($result);
    }
}
