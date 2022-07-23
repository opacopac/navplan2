<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportRunway;
use Navplan\Aerodrome\DomainModel\AirportRunwayOperations;
use Navplan\Aerodrome\DomainModel\AirportRunwayType;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;


class DbAirportRunwayConverter {
    public const TABLE_NAME = "openaip_runways2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_OPERATIONS = "operations";
    public const COL_NAME = "name";
    public const COL_SURFACE = "surface";
    public const COL_LENGTH = "length";
    public const COL_WIDTH = "width";
    public const COL_DIRECTION = "direction";
    public const COL_TORA = "tora";
    public const COL_LDA = "lda";
    public const COL_PAPI = "papi";


    public static function fromDbRow(array $row): AirportRunway {
        $length = StringNumberHelper::parseFloatOrNull($row, self::COL_LENGTH, TRUE);
        $width = StringNumberHelper::parseFloatOrNull($row, self::COL_WIDTH, TRUE);
        $tora = StringNumberHelper::parseFloatOrNull($row, self::COL_TORA, TRUE);
        $lda = StringNumberHelper::parseFloatOrNull($row, self::COL_LDA, TRUE);

        return new AirportRunway(
            $row[self::COL_NAME],
            AirportRunwayType::from($row[self::COL_SURFACE]),
            $length ? new Length($length, LengthUnit::M) : NULL,
            $width ? new Length($width, LengthUnit::M) : NULL,
            intval($row[self::COL_DIRECTION]),
            $tora ? new Length($tora, LengthUnit::M) : NULL,
            $lda ? new Length($lda, LengthUnit::M) : NULL,
            StringNumberHelper::parseBoolOrNull($row, self::COL_PAPI),
            AirportRunwayOperations::from($row[self::COL_OPERATIONS])
        );
    }




    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . self::TABLE_NAME . " (" . join(", ", [
                self::COL_AIRPORT_ID,
                self::COL_NAME,
                self::COL_SURFACE,
                self::COL_LENGTH,
                self::COL_WIDTH,
                self::COL_DIRECTION,
                self::COL_TORA,
                self::COL_LDA,
                self::COL_PAPI,
                self::COL_OPERATIONS,
            ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(AirportRunway $rwy, int $airport_id, IDbStatement $insertStatement) {
        $surface = $rwy->surface->value;
        $length = $rwy->length->getM();
        $width = $rwy->width->getM();
        $tora = $rwy->tora?->getM();
        $lda = $rwy->lda?->getM();
        $operations = $rwy->operations->value;

        $insertStatement->bind_param("issddiiiis",
            $airport_id,
            $rwy->name,
            $surface,
            $length,
            $width,
            $rwy->direction,
            $tora,
            $lda,
            $rwy->papi,
            $operations
        );
    }
}
