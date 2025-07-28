<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirport extends DbRow
{
    public function __construct(
        private readonly DbTableAirport $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getType(): string
    {
        return $this->getValue($this->table->colType());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getIcao(): ?string
    {
        return $this->getValue($this->table->colIcao());
    }


    public function getCountry(): string
    {
        return $this->getValue($this->table->colCountry());
    }


    public function getLatitude(): float
    {
        return $this->getValue($this->table->colLatitude());
    }


    public function getLongitude(): float
    {
        return $this->getValue($this->table->colLongitude());
    }


    public function getElevationMtAmsl(): float
    {
        return $this->getValue($this->table->colElevation());
    }
}
