<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\AircraftType;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Domain\Model\EngineType;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/*
 * @extends DbEntityConverter<AircraftTypeDesignator>
 */

class DbAircraftTypeDesignatorConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAircraftTypeDesignator $table)
    {
    }


    public function fromDbRow(array $row): AircraftTypeDesignator
    {
        $r = new DbRowAircraftTypeDesignator($this->table, $row);

        return new AircraftTypeDesignator(
            $r->getId(),
            $r->getDesignator(),
            $r->getModel(),
            $r->getManufacturer(),
            AircraftType::from($r->getAcType()),
            EngineType::from($r->getEngType()),
            $r->getEngCount(),
            $r->getWtc()
        );
    }


    public function bindInsertValues(AircraftTypeDesignator $acTypeDesignator, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colDesignator(), $acTypeDesignator->designator)
            ->setColValue($this->table->colModel(), $acTypeDesignator->model)
            ->setColValue($this->table->colManufacturer(), $acTypeDesignator->manufacturer)
            ->setColValue($this->table->colAcType(), $acTypeDesignator->ac_type->value)
            ->setColValue($this->table->colEngType(), $acTypeDesignator->engine_type->value)
            ->setColValue($this->table->colEngCount(), $acTypeDesignator->engine_count)
            ->setColValue($this->table->colWtc(), $acTypeDesignator->wtc);
    }
}
