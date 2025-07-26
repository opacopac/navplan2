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
        $t = new DbTableAirportRadio();
        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colCategory(),
                $t->colFrequency(),
                $t->colType(),
                $t->colName(),
                $t->colIsPrimary(),
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals($t->colType(), "COMMUNICATION", "1")
                    ->whenEquals($t->colType(), "OTHER", "2")
                    ->whenEquals($t->colType(), "INFORMATION", "3")
                    ->else("4")
                    ->build() . " AS sortorder1",
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals($t->colType(), "TOWER", "1")
                    ->whenEquals($t->colType(), "CTAF", "2")
                    ->whenEquals($t->colType(), "OTHER", "3")
                    ->else("4")
                    ->build() . " AS sortorder2"
            )
            ->whereEquals($t->colAirportId(), $airportId)
            ->orderBy("sortorder1", DbSortOrder::ASC)
            ->orderBy("sortorder2", DBSortOrder::ASC)
            ->orderBy($t->colFrequency(), DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading radios for airport id " . $airportId);
        $converter = new DbAirportRadioConverter($t);

        return $converter->fromDbResult($result);
    }
}
