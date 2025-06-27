<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Model\AirportRunwayType;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\IDbResult;
use Navplan\System\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\IDbService;


class DbAirportRunwayConverter {
    public static function fromDbRow(array $row): AirportRunway {
        $length = StringNumberHelper::parseFloatOrNull($row, DbTableAirportRunway::COL_LENGTH, TRUE);
        $width = StringNumberHelper::parseFloatOrNull($row, DbTableAirportRunway::COL_WIDTH, TRUE);
        $tora = StringNumberHelper::parseFloatOrNull($row, DbTableAirportRunway::COL_TORA, TRUE);
        $lda = StringNumberHelper::parseFloatOrNull($row, DbTableAirportRunway::COL_LDA, TRUE);

        return new AirportRunway(
            $row[DbTableAirportRunway::COL_NAME],
            AirportRunwayType::from($row[DbTableAirportRunway::COL_SURFACE]),
            $length ? new Length($length, LengthUnit::M) : NULL,
            $width ? new Length($width, LengthUnit::M) : NULL,
            intval($row[DbTableAirportRunway::COL_DIRECTION]),
            $tora ? new Length($tora, LengthUnit::M) : NULL,
            $lda ? new Length($lda, LengthUnit::M) : NULL,
            StringNumberHelper::parseBoolOrNull($row, DbTableAirportRunway::COL_PAPI),
            AirportRunwayOperations::from($row[DbTableAirportRunway::COL_OPERATIONS])
        );
    }


    /**
     * @param IDbResult $result
     * @return AirportRunway[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $adRwys = [];
        while ($row = $result->fetch_assoc()) {
            $adRwys[] = self::fromDbRow($row);
        }

        return $adRwys;
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . DbTableAirportRunway::TABLE_NAME . " (" . join(", ", [
                DbTableAirportRunway::COL_AIRPORT_ID,
                DbTableAirportRunway::COL_NAME,
                DbTableAirportRunway::COL_SURFACE,
                DbTableAirportRunway::COL_LENGTH,
                DbTableAirportRunway::COL_WIDTH,
                DbTableAirportRunway::COL_DIRECTION,
                DbTableAirportRunway::COL_TORA,
                DbTableAirportRunway::COL_LDA,
                DbTableAirportRunway::COL_PAPI,
                DbTableAirportRunway::COL_OPERATIONS,
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
