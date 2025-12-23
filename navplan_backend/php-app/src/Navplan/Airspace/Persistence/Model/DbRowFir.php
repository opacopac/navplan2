<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowFir extends DbRow
{
    public function __construct(
        private readonly DbTableFir $table,
        array $row
    ) {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getRegion(): string
    {
        return $this->getValue($this->table->colRegion());
    }


    public function getIcao(): string
    {
        return $this->getValue($this->table->colIcao());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getStateCode(): string
    {
        return $this->getValue($this->table->colStateCode());
    }


    public function getStateName(): string
    {
        return $this->getValue($this->table->colStateName());
    }


    public function getCenterLat(): float
    {
        return $this->getValue($this->table->colCenterLat());
    }


    public function getCenterLon(): float
    {
        return $this->getValue($this->table->colCenterLon());
    }


    public function getPolygon(): string
    {
        return $this->getValue($this->table->colPolygon());
    }
}

