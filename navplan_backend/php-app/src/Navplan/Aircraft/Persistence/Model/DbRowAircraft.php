<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\FuelType;
use Navplan\Aircraft\Domain\Model\VehicleType;
use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Persistence\Model\DbConsumptionConverter;
use Navplan\Common\Persistence\Model\DbLengthConverter;
use Navplan\Common\Persistence\Model\DbSpeedConverter;
use Navplan\Common\Persistence\Model\DbWeightConverter;
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


    public function getVehicleType(): VehicleType
    {
        return VehicleType::from($this->getValue($this->table->colVehicleType()));
    }


    public function getRegistration(): string
    {
        return $this->getValue($this->table->colRegistration());
    }


    public function getIcaoType(): string
    {
        return $this->getValue($this->table->colIcaoType());
    }


    public function getCruiseSpeed(): Speed
    {
        return DbSpeedConverter::fromDbRow(
            $this->row,
            $this->table->colCruiseSpeed()->getName(),
            $this->table->colSpeedUnit()->getName(),
        );
    }


    public function getCruiseConsumption(): Consumption
    {
        return DbConsumptionConverter::fromDbRow(
            $this->row,
            $this->table->colCruiseConsumption()->getName(),
            $this->table->colConsumptionUnit()->getName(),
        );
    }


    public function getFuelType(): ?FuelType
    {
        $value = $this->getValue($this->table->colFuelType());

        return $value !== null
            ? FuelType::from($value)
            : null;
    }


    public function getBew(): ?Weight
    {
        return DbWeightConverter::fromDbRow(
            $this->row,
            $this->table->colBew(),
            $this->table->colWeightUnit(),
        );
    }


    public function getMtow(): ?Weight
    {
        return DbWeightConverter::fromDbRow(
            $this->row,
            $this->table->colMtow(),
            $this->table->colWeightUnit(),
        );
    }


    public function getRocSealevel(): ?Speed
    {
        return DbSpeedConverter::fromDbRow(
            $this->row,
            $this->table->colRocSealevel(),
            $this->table->colVerticalSpeedUnit(),
        );
    }


    public function getServiceCeiling(): ?Length
    {
        return DbLengthConverter::fromDbRow(
            $this->row,
            $this->table->colServiceCeiling(),
            $this->table->colAltitudeUnit(),
        );
    }
}
