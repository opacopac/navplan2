<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


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
            $r->getVehicleType(),
            $r->getRegistration(),
            $r->getIcaoType(),
            $r->getCruiseSpeed(),
            $r->getCruiseConsumption(),
            $r->getFuelType(),
            $r->getMtow(),
            $r->getBew(),
            $r->getRocSealevel(),
            $r->getServiceCeiling(),
            null,
            null,
            null,
            null,
            [],
            []
        );
    }
}
