<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Model\AirportRunwayType;
use Navplan\Common\Domain\Model\Length;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<AirportRunway>
 */
class DbAirportRunwayConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirportRunway $table)
    {
    }

    public function fromDbRow(array $row): AirportRunway
    {
        $r = new DbRowAirportRunway($this->table, $row);

        return new AirportRunway(
            $r->getName(),
            AirportRunwayType::from($r->getSurface()),
            Length::fromM($r->getLength()),
            Length::fromM($r->getWidth()),
            $r->getDirection(),
            Length::fromM($r->getTora()),
            Length::fromM($r->getLda()),
            $r->getPapi(),
            AirportRunwayOperations::from($r->getOperations()),
        );
    }


    public function bindInsertValues(AirportRunway $rwy, int $adId, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colAirportId(), $adId)
            ->setColValue($this->table->colName(), $rwy->name)
            ->setColValue($this->table->colSurface(), $rwy->surface->value)
            ->setColValue($this->table->colLength(), $rwy->length->getM())
            ->setColValue($this->table->colWidth(), $rwy->width->getM())
            ->setColValue($this->table->colDirection(), $rwy->direction)
            ->setColValue($this->table->colTora(), $rwy->tora?->getM())
            ->setColValue($this->table->colLda(), $rwy->lda?->getM())
            ->setColValue($this->table->colPapi(), $rwy->papi)
            ->setColValue($this->table->colOperations(), $rwy->operations->value);
    }
}
