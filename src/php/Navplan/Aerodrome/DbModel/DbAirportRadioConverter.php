<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportRadio;
use Navplan\Aerodrome\DomainModel\AirportRadioType;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;


class DbAirportRadioConverter {
    public const TABLE_NAME = "openaip_radios2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_CATEGORY = "category";
    public const COL_FREQUENCY = "frequency";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_IS_PRIMARY = "is_primary";


    public static function fromDbRow(array $row): AirportRadio {
        return new AirportRadio(
            $row[self::COL_CATEGORY],
            new Frequency(floatval($row[self::COL_FREQUENCY]), FrequencyUnit::MHZ),
            AirportRadioType::from($row[self::COL_TYPE]),
            $row[self::COL_NAME] ?? null,
            boolval($row[self::COL_IS_PRIMARY])
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . self::TABLE_NAME . " (" . join(", ", [
                self::COL_AIRPORT_ID,
                self::COL_CATEGORY,
                self::COL_FREQUENCY,
                self::COL_TYPE,
                self::COL_NAME,
                self::COL_IS_PRIMARY,
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
