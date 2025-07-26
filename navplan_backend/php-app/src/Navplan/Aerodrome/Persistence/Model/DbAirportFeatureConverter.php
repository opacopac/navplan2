<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<AirportFeature>
 */
class DbAirportFeatureConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableMapFeatures $table)
    {
    }


    public function fromDbRow(array $row): AirportFeature
    {
        $r = new DbRowAirportFeature($this->table, $row);

        return new AirportFeature(
            $r->getType(),
            $r->getName(),
            $r->getPosition()
        );
    }
}
