<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\GeoHelper;
use Navplan\Navaid\Domain\Model\Navaid;
use Navplan\Navaid\Domain\Model\NavaidType;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


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

        return new Navaid(
            $r->getId(),
            NavaidType::from($r->getType()),
            $r->getKuerzel(),
            $r->getName(),
            Position2d::fromLonLat($r->getLongitude(), $r->getLatitude()),
            Altitude::fromMtAmsl($r->getElevation()),
            $r->getType() === NavaidType::NDB->value ?
                Frequency::fromKhz(floatval($r->getFrequency())) :
                Frequency::fromMhz(floatval($r->getFrequency())),
            $r->getDeclination(),
            $r->isTrueNorth()
        );
    }


    public function bindInsertValues(Navaid $navaid, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colType(), $navaid->type->value)
            ->setColValue($this->table->colCountry(), "XX") // TODO: country code
            ->setColValue($this->table->colName(), $navaid->name)
            ->setColValue($this->table->colKuerzel(), $navaid->kuerzel)
            ->setColValue($this->table->colLat(), $navaid->position->latitude)
            ->setColValue($this->table->colLon(), $navaid->position->longitude)
            ->setColValue($this->table->colElevation(), $navaid->elevation->getHeightAmsl()->getM())
            ->setColValue($this->table->colFrequency(), $navaid->frequency->value)
            ->setColValue($this->table->colDeclination(), $navaid->declination)
            ->setColValue($this->table->colTrueNorth(), $navaid->isTrueNorth)
            ->setColValue($this->table->colGeoHash(), GeoHelper::calcGeoHash($navaid->position, 14)) // TODO: geohash precision
            ->setColValue($this->table->colLonlat(), $navaid->position);
    }
}
