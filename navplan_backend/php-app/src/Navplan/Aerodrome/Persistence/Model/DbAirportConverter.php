<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\AirportType;
use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\GeoHelper;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<Airport>
 */
class DbAirportConverter extends DBEntityConverter
{
    public function __construct(private readonly DbTableAirport $table)
    {
    }


    public function fromDbRow(array $row): Airport
    {
        $r = new DbRowAirport($this->table, $row);

        return new Airport(
            $r->getId(),
            AirportType::from($r->getType()),
            $r->getName(),
            $r->getIcao(),
            $r->getCountry(),
            $r->getPosition(),
            Altitude::fromMtAmsl($r->getElevationMtAmsl())
        );
    }


    public function bindInsertValues(Airport $airport, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colType(), $airport->type->value)
            ->setColValue($this->table->colName(), $airport->name)
            ->setColValue($this->table->colIcao(), $airport->icao)
            ->setColValue($this->table->colCountry(), $airport->country)
            ->setColValue($this->table->colLongitude(), $airport->position->longitude)
            ->setColValue($this->table->colLatitude(), $airport->position->latitude)
            ->setColValue($this->table->colElevation(), $airport->elevation->getHeightAmsl()->getM())
            ->setColValue($this->table->colGeoHash(), GeoHelper::calcGeoHash($airport->position, 14)) // TODO: precision
            ->setColValue($this->table->colLonLat(), $airport->position);
    }
}
