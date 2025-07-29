<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAircraftWeightItems extends DbRow
{
    public function __construct(
        private readonly DbTableAircraftWeightItems $table,
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


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getArmLong(): float
    {
        return $this->getValue($this->table->colArmLong());
    }


    public function getArmLat(): float
    {
        return $this->getValue($this->table->colArmLat());
    }


    public function getArmUnit(): string
    {
        return $this->getValue($this->table->colArmUnit());
    }


    public function getMaxWeight(): ?float
    {
        return $this->getValue($this->table->colMaxWeight());
    }


    public function getDefaultWeight(): ?float
    {
        return $this->getValue($this->table->colDefaultWeight());
    }


    public function getWeightUnit(): ?string
    {
        return $this->getValue($this->table->colWeightUnit());
    }


    public function getMaxFuel(): ?float
    {
        return $this->getValue($this->table->colMaxFuel());
    }


    public function getDefaultFuel(): ?float
    {
        return $this->getValue($this->table->colDefaultFuel());
    }


    public function getFuelUnit(): ?string
    {
        return $this->getValue($this->table->colFuelUnit());
    }
}
