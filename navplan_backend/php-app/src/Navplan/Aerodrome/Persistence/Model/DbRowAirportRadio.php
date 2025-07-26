<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirportRadio extends DbRow
{
    public function __construct(
        private readonly DbTableAirportRadio $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getAirportId(): int
    {
        return $this->getValue($this->table->colAirportId());
    }


    public function getCategory(): string
    {
        return $this->getValue($this->table->colCategory());
    }


    public function getFrequency(): float
    {
        return $this->getValue($this->table->colFrequency());
    }


    public function getType(): string
    {
        return $this->getValue($this->table->colType());
    }


    public function getName(): ?string
    {
        return $this->getValue($this->table->colName());
    }


    public function isPrimary(): bool
    {
        return $this->getValue($this->table->colIsPrimary());
    }
}
