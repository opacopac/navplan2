<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Model\AirportRadioType;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/**
 * @extends DbEntityConverter<AirportRadio>
 */
class DbAirportRadioConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirportRadio $table)
    {
    }


    public function fromDbRow(array $row): AirportRadio
    {
        $r = new DbRowAirportRadio($this->table, $row);

        return new AirportRadio(
            $r->getCategory(),
            Frequency::fromMhz($r->getFrequency()),
            AirportRadioType::from($r->getType()),
            $r->getName(),
            $r->isPrimary()
        );
    }


    public function bindInsertValues(AirportRadio $radio, int $adId, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colAirportId(), $adId)
            ->setColValue($this->table->colCategory(), $radio->category)
            ->setColValue($this->table->colFrequency(), $radio->frequency->value)
            ->setColValue($this->table->colType(), $radio->type->value)
            ->setColValue($this->table->colName(), $radio->name)
            ->setColValue($this->table->colIsPrimary(), $radio->isPrimary);
    }
}
