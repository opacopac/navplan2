<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Model\AirportRadioType;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\Domain\Service\IDbService;


/**
 * @extends DbEntityConverter<AirportRadio>
 */
class DbAirportRadioConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirportRadio $table)
    {
    }


    public function fromDbRow(array $row): AirportRadio
    {
        $r = new DbRowAirportRadio($this->table, $row);

        return new AirportRadio(
            $r->getCategory(),
            new Frequency($r->getFrequency(), FrequencyUnit::MHZ),
            AirportRadioType::from($r->getType()),
            $r->getName(),
            $r->isPrimary()
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement
    {
        $query = "INSERT INTO " . DbTableAirportRadio::TABLE_NAME . " (" . join(", ", [
                DbTableAirportRadio::COL_AIRPORT_ID,
                DbTableAirportRadio::COL_CATEGORY,
                DbTableAirportRadio::COL_FREQUENCY,
                DbTableAirportRadio::COL_TYPE,
                DbTableAirportRadio::COL_NAME,
                DbTableAirportRadio::COL_IS_PRIMARY,
            ]) . ") VALUES (?, ?, ?, ?, ?, ?)";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(AirportRadio $radio, int $airport_id, IDbStatement $insertStatement)
    {
        $type = $radio->type->value;

        $insertStatement->bind_param("isdssi",
            $airport_id,
            $radio->category,
            $radio->frequency->value,
            $type,
            $radio->name,
            $radio->isPrimary
        );
    }
}
