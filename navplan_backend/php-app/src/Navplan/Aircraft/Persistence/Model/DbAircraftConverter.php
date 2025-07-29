<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Model\FuelType;
use Navplan\Aircraft\Domain\Model\VehicleType;
use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\Weight;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<Aircraft>
 */
class DbAircraftConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAircraft $table)
    {
    }


    public function fromDbRow(array $row): Aircraft
    {
        $r = new DbRowAircraft($this->table, $row);

        return new Aircraft(
            $r->getId(),
            VehicleType::from($r->getVehicleType()),
            $r->getRegistration(),
            $r->getIcaoType(),
            Speed::fromValueAndUnitString($r->getCruiseSpeed(), $r->getSpeedUnit()),
            Consumption::fromValueAndUnitString($r->getCruiseConsumption(), $r->getConsumptionUnit()),
            $r->getFuelType() !== null
                ? FuelType::from($r->getFuelType())
                : null,
            Weight::fromValueAndUnitString($r->getMtow(), $r->getWeightUnit()),
            Weight::fromValueAndUnitString($r->getBew(), $r->getWeightUnit()),
            Speed::fromValueAndUnitString($r->getRocSealevel(), $r->getVerticalSpeedUnit()),
            Length::fromValueAndUnitString($r->getServiceCeiling(), $r->getAltitudeUnit()),
            null,
            null,
            null,
            null,
            [],
            []
        );
    }


    public function bindInsertValues(Aircraft $aircraft, int $userId, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colIdUser(), $userId)
            ->setColValue($this->table->colVehicleType(), $aircraft->vehicleType->value)
            ->setColValue($this->table->colRegistration(), $aircraft->registration)
            ->setColValue($this->table->colIcaoType(), $aircraft->icaoType)
            ->setColValue($this->table->colCruiseSpeed(), $aircraft->cruiseSpeed->value)
            ->setColValue($this->table->colSpeedUnit(), $aircraft->cruiseSpeed->unit->value)
            ->setColValue($this->table->colCruiseConsumption(), $aircraft->cruiseFuel->value)
            ->setColValue($this->table->colConsumptionUnit(), $aircraft->cruiseFuel->unit->value)
            ->setColValue($this->table->colFuelType(), $aircraft->fuelType?->value)
            ->setColValue($this->table->colBew(), $aircraft->bew?->value)
            ->setColValue($this->table->colMtow(), $aircraft->mtow?->value)
            ->setColValue($this->table->colWeightUnit(), $aircraft->mtow ? $aircraft->mtow->unit->value : $aircraft->bew?->unit->value)
            ->setColValue($this->table->colRocSealevel(), $aircraft->rocSealevel?->value)
            ->setColValue($this->table->colVerticalSpeedUnit(), $aircraft->rocSealevel?->unit->value)
            ->setColValue($this->table->colServiceCeiling(), $aircraft->serviceCeiling?->value)
            ->setColValue($this->table->colAltitudeUnit(), $aircraft->serviceCeiling?->unit->value);
    }
}
