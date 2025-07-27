<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Airspace\Domain\Model\AirspaceClass;
use Navplan\Airspace\Domain\Model\AirspaceType;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<Airspace>
 */
class DbAirspaceConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirspace $table)
    {
    }


    /**
     * @param array $row
     * @return Airspace
     */
    public function fromDbRow(array $row): Airspace
    {
        $r = new DbRowAirspace($this->table, $row);

        return new Airspace(
            $r->getId(),
            $r->getClass() !== null ? AirspaceClass::from($r->getClass()) : null,
            $r->getType() !== null ? AirspaceType::from($r->getType()) : null,
            $r->getCategory(),
            $r->getCountry(),
            $r->getName(),
            $r->getAltBottom(),
            $r->getAltTop(),
            $r->getPolygon()
        );
    }


    public function bindInsertValues(Airspace $airspace, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colCategory(), $airspace->category)
            ->setColValue($this->table->colClass(), $airspace->class?->value)
            ->setColValue($this->table->colType(), $airspace->type?->value)
            ->setColValue($this->table->colCountry(), $airspace->country)
            ->setColValue($this->table->colName(), $airspace->name)
            ->setColValue($this->table->colAltTopRef(), $airspace->alt_top->reference->value)
            ->setColValue($this->table->colAltTopHeight(), $airspace->alt_top->value)
            ->setColValue($this->table->colAltTopUnit(), $airspace->alt_top->unit->value)
            ->setColValue($this->table->colAltBotRef(), $airspace->alt_bottom->reference->value)
            ->setColValue($this->table->colAltBotHeight(), $airspace->alt_bottom->value)
            ->setColValue($this->table->colAltBotUnit(), $airspace->alt_bottom->unit->value)
            ->setColValue($this->table->colPolygon(), $airspace->polygon->toString())
            ->setColValue($this->table->colExtent(), $airspace->polygon);
    }
}
