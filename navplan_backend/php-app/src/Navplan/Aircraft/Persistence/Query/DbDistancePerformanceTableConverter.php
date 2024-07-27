<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Domain\Model\PerformanceTableAltitudeReference;
use Navplan\Aircraft\Domain\Model\PerformanceTableTemperatureReference;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;


class DbDistancePerformanceTableConverter
{
    public static function fromDbRow(array $row): DistancePerformanceTable
    {
        $altSteps = self::parseAltitudeSteps($row[DbTableAircraftPerfDist::COL_ALT_STEPS_FT]);
        $tempSteps = self::parseTemperatureSteps($row[DbTableAircraftPerfDist::COL_TEMP_STEPS_C]);

        return new DistancePerformanceTable(
            new Weight(floatval($row[DbTableAircraftPerfDist::COL_TKOFF_WEIGHT_KG]), WeightUnit::KG),
            PerformanceTableAltitudeReference::from($row[DbTableAircraftPerfDist::COL_ALT_REF]),
            $altSteps,
            PerformanceTableTemperatureReference::from($row[DbTableAircraftPerfDist::COL_TEMP_REF]),
            $tempSteps,
            self::parseDistances($row[DbTableAircraftPerfDist::COL_DISTANCES_M], count($altSteps), count($tempSteps)),
            DbDistancePerformanceCorrectionFactorsConverter::fromDbRow($row)
        );
    }


    /**
     * @param string $jsonString
     * @return Length[]
     */
    private static function parseAltitudeSteps(string $jsonString): array
    {
        return array_map(function ($value) {
            return new Length($value, LengthUnit::FT);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Temperature[]
     */
    private static function parseTemperatureSteps(string $jsonString): array
    {
        return array_map(function ($value) {
            return new Temperature($value, TemperatureUnit::C);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Length[][]
     */
    private static function parseDistances(string $jsonString, int $rows, $cols): array
    {
        $distances = [];
        $jsonArray = json_decode($jsonString, true);

        for ($i = 0; $i < $rows; $i++) {
            $distances[$i] = [];
            for ($j = 0; $j < $cols; $j++) {
                $distances[$i][$j] = new Length($jsonArray[$i][$j], LengthUnit::M);
            }
        }

        return $distances;
    }
}
