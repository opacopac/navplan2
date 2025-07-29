<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAircraftPerfDist extends DbRow
{
    public function __construct(
        private readonly DbTableAircraftPerfDist $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getIdAircraft(): int
    {
        return $this->getValue($this->table->colIdAircraft());
    }


    public function getType(): string
    {
        return $this->getValue($this->table->colType());
    }


    public function getProfileName(): string
    {
        return $this->getValue($this->table->colProfileName());
    }


    public function getAltRef(): string
    {
        return $this->getValue($this->table->colAltRef());
    }


    public function getAltSteps(): string
    {
        return $this->getValue($this->table->colAltSteps());
    }


    public function getAltUnit(): string
    {
        return $this->getValue($this->table->colAltUnit());
    }


    public function getTempRef(): string
    {
        return $this->getValue($this->table->colTempRef());
    }


    public function getTempSteps(): string
    {
        return $this->getValue($this->table->colTempSteps());
    }


    public function getTempUnit(): string
    {
        return $this->getValue($this->table->colTempUnit());
    }


    public function getDistanceValues(): string
    {
        return $this->getValue($this->table->colDistances());
    }


    public function getDistanceUnit(): string
    {
        return $this->getValue($this->table->colDistanceUnit());
    }


    public function getHeadwindDecPercent(): float
    {
        return $this->getValue($this->table->colHeadwindDecPerc());
    }


    public function getHeadwindDecPerSpeed(): float
    {
        return $this->getValue($this->table->colHeadwindDecPerSpeed());
    }


    public function getTailwindIncPercent(): float
    {
        return $this->getValue($this->table->colTailwindIncPerc());
    }


    public function getTailwindIncPerSpeed(): float
    {
        return $this->getValue($this->table->colTailwindIncPerSpeed());
    }


    public function getSpeedUnit(): string
    {
        return $this->getValue($this->table->colSpeedUnit());
    }


    public function getGrassRwyIncPercent(): float
    {
        return $this->getValue($this->table->colGrassRwyIncPerc());
    }


    public function getWetRwyIncPercent(): float
    {
        return $this->getValue($this->table->colWetRwyIncPerc());
    }
}
