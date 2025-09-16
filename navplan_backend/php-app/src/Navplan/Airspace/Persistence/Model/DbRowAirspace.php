<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirspace extends DbRow
{
    public function __construct(
        private readonly DbTableAirspace $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getCategory(): string
    {
        return $this->getValue($this->table->colCategory());
    }


    public function getClass(): ?string
    {
        return $this->getValue($this->table->colClass());
    }


    public function getType(): ?string
    {
        return $this->getValue($this->table->colType());
    }


    public function getCountry(): string
    {
        return $this->getValue($this->table->colCountry());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getAltTopRef(): string
    {
        return $this->getValue($this->table->colAltTopRef());
    }


    public function getAltTopHeight(): int
    {
        return $this->getValue($this->table->colAltTopHeight());
    }


    public function getAltTopUnit(): string
    {
        return $this->getValue($this->table->colAltTopUnit());
    }


    public function getAltBotRef(): string
    {
        return $this->getValue($this->table->colAltBotRef());
    }


    public function getAltBotHeight(): int
    {
        return $this->getValue($this->table->colAltBotHeight());
    }


    public function getAltBotUnit(): string
    {
        return $this->getValue($this->table->colAltBotUnit());
    }


    public function getDiameter(): ?float
    {
        return $this->getValue($this->table->colDiameter());
    }


    public function getPolygon(): ?string
    {
        return $this->getValue($this->table->colPolygon(), true);
    }


    public function getExtent(): string
    {
        return $this->getValue($this->table->colExtent());
    }
}
