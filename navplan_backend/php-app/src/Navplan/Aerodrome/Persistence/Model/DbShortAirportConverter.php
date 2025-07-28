<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<ShortAirport>
 */
class DbShortAirportConverter extends DbEntityConverter
{
    public function __construct(
        private readonly DbTableAirport $tAd,
        private readonly DbTableAirportRunway $tRwy,
    )
    {
    }


    public function fromDbRow(array $row): ShortAirport
    {
        $r = new DbRowShortAirport($this->tAd, $this->tRwy, $row);

        return new ShortAirport(
            $r->getId(),
            $r->getType(),
            $r->getIcao(),
            Position2d::fromLonLat($r->getLongitude(), $r->getLatitude()),
            $r->getRwyDirection(),
            $r->getRwySurface(),
            $r->getFeatures() !== null && $r->getFeatures() !== ""
                ? explode(",", $r->getFeatures())
                : []
        );
    }
}
