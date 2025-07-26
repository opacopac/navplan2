<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\Navaid\Domain\Model\Navaid;
use Navplan\Navaid\Domain\Model\NavaidType;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<Navaid>
 */
class DbNavaidConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableNavaid $table)
    {
    }


    /**
     * @param array $row
     * @return Navaid
     */
    public function fromDbRow(array $row): Navaid
    {
        $r = new DbRowNavaid($this->table, $row);
        $freqType = $r->getType() === "NDB" ? FrequencyUnit::KHZ : FrequencyUnit::MHZ;

        return new Navaid(
            $r->getId(),
            NavaidType::from($r->getType()),
            $r->getKuerzel(),
            $r->getName(),
            $r->getPosition(),
            Altitude::fromMtAmsl($r->getElevation()),
            new Frequency(floatval($r->getFrequency()), $freqType),
            $r->getDeclination(),
            $r->isTrueNorth()
        );
    }
}
