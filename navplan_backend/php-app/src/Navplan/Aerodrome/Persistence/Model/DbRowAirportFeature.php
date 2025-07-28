<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirportFeature extends DbRow
{
    public function __construct(
        private readonly DbTableMapFeatures $table,
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


    public function getAirportIcao(): ?string
    {
        return $this->getValue($this->table->colAdIcao());
    }


    public function getLatitude(): ?float
    {
        return $this->getValue($this->table->colLat());
    }


    public function getLongitude(): ?float
    {
        return $this->getValue($this->table->colLon());
    }
}
