<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirportRunway extends DbRow
{
    public function __construct(
        private readonly DbTableAirportRunway $table,
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


    public function getOperations(): string
    {
        return $this->getValue($this->table->colOperations());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getSurface(): string
    {
        return $this->getValue($this->table->colSurface());
    }


    public function getLength(): float
    {
        return $this->getValue($this->table->colLength(), false, true);
    }


    public function getWidth(): float
    {
        return $this->getValue($this->table->colWidth(), false, true);
    }


    public function getDirection(): int
    {
        return $this->getValue($this->table->colDirection());
    }


    public function getTora(): ?int
    {
        return $this->getValue($this->table->colTora(), false, true);
    }


    public function getLda(): ?int
    {
        return $this->getValue($this->table->colLda(), false, true);
    }


    public function getPapi(): ?bool
    {
        return $this->getValue($this->table->colPapi());
    }
}
