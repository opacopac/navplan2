<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Domain\Model\PerformanceTableAltitudeReference;
use Navplan\Aircraft\Domain\Model\PerformanceTableTemperatureReference;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;


class DbDistancePerformanceTableConverter
{
    public static function fromDbRow(array $row): DistancePerformanceTable
    {
        $altSteps = self::parseAltitudeSteps(
            $row[DbTableAircraftPerfDist::COL_ALT_STEPS],
            LengthUnit::from($row[DbTableAircraftPerfDist::COL_ALT_UNIT])
        );
        $tempSteps = self::parseTemperatureSteps(
            $row[DbTableAircraftPerfDist::COL_TEMP_STEPS],
            TemperatureUnit::from($row[DbTableAircraftPerfDist::COL_TEMP_UNIT])
        );

        return new DistancePerformanceTable(
            $row[DbTableAircraftPerfDist::COL_PROFILE_NAME],
            PerformanceTableAltitudeReference::from($row[DbTableAircraftPerfDist::COL_ALT_REF]),
            $altSteps,
            PerformanceTableTemperatureReference::from($row[DbTableAircraftPerfDist::COL_TEMP_REF]),
            $tempSteps,
            self::parseDistances(
                $row[DbTableAircraftPerfDist::COL_DISTANCES],
                count($altSteps),
                count($tempSteps),
                LengthUnit::from($row[DbTableAircraftPerfDist::COL_DISTANCE_UNIT])
            ),
            DbDistancePerformanceCorrectionFactorsConverter::fromDbRow($row)
        );
    }


    /**
     * @param string $jsonString
     * @return Length[]
     */
    private static function parseAltitudeSteps(string $jsonString, LengthUnit $altUnit): array
    {
        return array_map(function ($value) use ($altUnit) {
            return new Length($value, $altUnit);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Temperature[]
     */
    private static function parseTemperatureSteps(string $jsonString, TemperatureUnit $tempUnit): array
    {
        return array_map(function ($value) use ($tempUnit) {
            return new Temperature($value, $tempUnit);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Length[][]
     */
    private static function parseDistances(string $jsonString, int $rows, $cols, LengthUnit $distanceUnit): array
    {
        $distances = [];
        $jsonArray = json_decode($jsonString, true);

        for ($i = 0; $i < $rows; $i++) {
            $distances[$i] = [];
            for ($j = 0; $j < $cols; $j++) {
                $distances[$i][$j] = new Length($jsonArray[$i][$j], $distanceUnit);
            }
        }

        return $distances;
    }
}
