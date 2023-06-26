<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Model\AirportRadioType;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\System\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\IDbService;


class DbAirportRadioConverter {
    public static function fromDbRow(array $row): AirportRadio {
        return new AirportRadio(
            $row[DbTableAirportRadio::COL_CATEGORY],
            new Frequency(floatval($row[DbTableAirportRadio::COL_FREQUENCY]), FrequencyUnit::MHZ),
            AirportRadioType::from($row[DbTableAirportRadio::COL_TYPE]),
            $row[DbTableAirportRadio::COL_NAME] ?? null,
            boolval($row[DbTableAirportRadio::COL_IS_PRIMARY])
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
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


    public static function bindInsertStatement(AirportRadio $radio, int $airport_id, IDbStatement $insertStatement) {
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
