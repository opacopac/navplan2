<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\System\Domain\Model\IDbResult;


class DbAirportFeatureConverter
{
    public static function fromDbRow(array $row): AirportFeature
    {
        return new AirportFeature(
            $row["type"],
            $row["name"],
            DbPosition2dConverter::fromDbRow($row)
        );
    }


    /**
     * @param IDbResult $result
     * @return AirportFeature[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $adFeature = [];
        while ($row = $result->fetch_assoc()) {
            $adFeature[] = self::fromDbRow($row);
        }

        return $adFeature;
    }
}
