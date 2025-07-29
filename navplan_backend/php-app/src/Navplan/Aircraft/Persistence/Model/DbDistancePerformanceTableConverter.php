<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Domain\Model\PerformanceTableAltitudeReference;
use Navplan\Aircraft\Domain\Model\PerformanceTableTemperatureReference;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<DistancePerformanceTable>
 */
class DbDistancePerformanceTableConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAircraftPerfDist $table)
    {
    }


    public function getType(array $row): string
    {
        $r = new DbRowAircraftPerfDist($this->table, $row);

        return $r->getType();
    }


    public function fromDbRow(array $row): DistancePerformanceTable
    {
        $r = new DbRowAircraftPerfDist($this->table, $row);

        $altSteps = self::parseAltitudeSteps($r->getAltSteps(), LengthUnit::from($r->getAltUnit()));
        $tempSteps = self::parseTemperatureSteps($r->getTempSteps(), TemperatureUnit::from($r->getTempUnit()));

        return new DistancePerformanceTable(
            $r->getProfileName(),
            PerformanceTableAltitudeReference::from($r->getAltRef()),
            $altSteps,
            PerformanceTableTemperatureReference::from($r->getTempRef()),
            $tempSteps,
            self::parseDistances(
                $r->getDistanceValues(),
                count($altSteps),
                count($tempSteps),
                LengthUnit::from($r->getdistanceUnit()),
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
