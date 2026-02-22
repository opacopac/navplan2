<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAircraft extends DbRow
{
    public function __construct(
        private readonly DbTableAircraft $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getUserId(): int
    {
        return $this->getValue($this->table->colIdUser());
    }


    public function getVehicleType(): string
    {
        return $this->getValue($this->table->colVehicleType());
    }


    public function getRegistration(): string
    {
        return $this->getValue($this->table->colRegistration());
    }


    public function getIcaoType(): string
    {
        return $this->getValue($this->table->colIcaoType());
    }


    public function getCruiseSpeed(): float
    {
        return $this->getValue($this->table->colCruiseSpeed());
    }


    public function getSpeedUnit(): string
    {
        return $this->getValue($this->table->colSpeedUnit());
    }


    public function getCruiseConsumption(): float
    {
        return $this->getValue($this->table->colCruiseConsumption());
    }


    public function getConsumptionUnit(): string
    {
        return $this->getValue($this->table->colConsumptionUnit());
    }


    public function getFuelType(): ?string
    {
        return $this->getValue($this->table->colFuelType());
    }


    public function getBew(): ?float
    {
        return $this->getValue($this->table->colBew());
    }


    public function getMtow(): ?float
    {
        return $this->getValue($this->table->colMtow());
    }


    public function getWeightUnit(): ?string
    {
        return $this->getValue($this->table->colWeightUnit());
    }


    public function getRocSealevel(): ?float
    {
        return $this->getValue($this->table->colRocSealevel());
    }


    public function getVerticalSpeedUnit(): ?string
    {
        return $this->getValue($this->table->colVerticalSpeedUnit());
    }


    public function getServiceCeiling(): ?float
    {
        return $this->getValue($this->table->colServiceCeiling());
    }


    public function getAltitudeUnit(): ?string
    {
        return $this->getValue($this->table->colAltitudeUnit());
    }


    public function getCruiseClimbSpeed(): ?float
    {
        return $this->getValue($this->table->colCruiseClimbSpeed());
    }
}
