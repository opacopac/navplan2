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
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


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

        $altSteps = $this->parseAltitudeSteps($r->getAltSteps(), LengthUnit::from($r->getAltUnit()));
        $tempSteps = $this->parseTemperatureSteps($r->getTempSteps(), TemperatureUnit::from($r->getTempUnit()));

        return new DistancePerformanceTable(
            $r->getProfileName(),
            PerformanceTableAltitudeReference::from($r->getAltRef()),
            $altSteps,
            PerformanceTableTemperatureReference::from($r->getTempRef()),
            $tempSteps,
            $this->parseDistances(
                $r->getDistanceValues(),
                count($altSteps),
                count($tempSteps),
                LengthUnit::from($r->getdistanceUnit()),
            ),
            DbDistancePerformanceCorrectionFactorsConverter::fromDbRow($row, $r)
        );
    }


    public function bindInsertValues(
        DistancePerformanceTable $perfTable,
        int $aircraftId,
        PerfDistTableType $tableType,
        IDbInsertCommandBuilder $icb
    ): void
    {
        $icb->setColValue($this->table->colIdAircraft(), $aircraftId)
            ->setColValue($this->table->colType(), $tableType->value)
            ->setColValue($this->table->colProfileName(), $perfTable->profileName)
            ->setColValue($this->table->colAltRef(), $perfTable->altitudeReference->value)
            ->setColValue($this->table->colAltSteps(), $this->createAltitudeStepsJsonString($perfTable->altitudeSteps))
            ->setColValue($this->table->colAltUnit(), $perfTable->altitudeSteps[0]->unit->value)
            ->setColValue($this->table->colTempRef(), $perfTable->temperatureReference->value)
            ->setColValue($this->table->colTempSteps(), $this->createTemperatureStepsJsonString($perfTable->temperatureSteps))
            ->setColValue($this->table->colTempUnit(), $perfTable->temperatureSteps[0]->unit->value)
            ->setColValue($this->table->colDistances(), $this->createDistanceValuesJsonString($perfTable->distanceValues))
            ->setColValue($this->table->colDistanceUnit(), $perfTable->distanceValues[0][0]->unit->value)
            ->setColValue($this->table->colHeadwindDecPerc(), $perfTable->correctionFactors->headwindDecPercent)
            ->setColValue($this->table->colHeadwindDecPerSpeed(), $perfTable->correctionFactors->headwindDecPerSpeed->value)
            ->setColValue($this->table->colTailwindIncPerc(), $perfTable->correctionFactors->tailwindIncPercent)
            ->setColValue($this->table->colTailwindIncPerSpeed(), $perfTable->correctionFactors->tailwindIncPerSpeed->value)
            ->setColValue($this->table->colSpeedUnit(), $perfTable->correctionFactors->headwindDecPerSpeed->unit->value)
            ->setColValue($this->table->colGrassRwyIncPerc(), $perfTable->correctionFactors->grassRwyIncPercent)
            ->setColValue($this->table->colWetRwyIncPerc(), $perfTable->correctionFactors->wetRwyIncPercent);
    }


    /**
     * @param string $jsonString
     * @return Length[]
     */
    private function parseAltitudeSteps(string $jsonString, LengthUnit $altUnit): array
    {
        return array_map(function ($value) use ($altUnit) {
            return new Length($value, $altUnit);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Temperature[]
     */
    private function parseTemperatureSteps(string $jsonString, TemperatureUnit $tempUnit): array
    {
        return array_map(function ($value) use ($tempUnit) {
            return new Temperature($value, $tempUnit);
        }, json_decode($jsonString));
    }


    /**
     * @param string $jsonString
     * @return Length[][]
     */
    private function parseDistances(string $jsonString, int $rows, $cols, LengthUnit $distanceUnit): array
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


    /**
     * @param Length[] $altitudeSteps
     * @return string
     */
    private function createAltitudeStepsJsonString(array $altitudeSteps): string
    {
        return json_encode(
            array_map(function (Length $value) {
                return $value->value;
            }, $altitudeSteps)
        );
    }


    /**
     * @param Temperature[] $temperatureSteps
     * @return string
     */
    private function createTemperatureStepsJsonString(array $temperatureSteps): string
    {
        return json_encode(
            array_map(function (Temperature $value) {
                return $value->value;
            }, $temperatureSteps)
        );
    }


    /**
     * @param Length[][] $distances
     * @return string
     */
    private function createDistanceValuesJsonString(array $distances): string
    {
        return json_encode(
            array_map(function (array $value) {
                return array_map(function (Length $value) {
                    return $value->value;
                }, $value);
            }, $distances)
        );
    }
}
