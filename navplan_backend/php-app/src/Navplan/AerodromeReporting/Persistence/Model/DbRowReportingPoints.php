<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowReportingPoints extends DbRow
{
    public function __construct(
        private readonly DbTableReportingPoints $table,
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


    public function getAirportIcao(): string
    {
        return $this->getValue($this->table->colAdIcao());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function isHeli(): ?bool
    {
        return $this->getValue($this->table->colHeli());
    }


    public function isInbdComp(): ?bool
    {
        return $this->getValue($this->table->colInbdComp());
    }


    public function isOutbdComp(): ?bool
    {
        return $this->getValue($this->table->colOutbdComp());
    }


    public function getMinFt(): ?int
    {
        return $this->getValue($this->table->colMinFt());
    }


    public function getMaxFt(): ?int
    {
        return $this->getValue($this->table->colMaxFt());
    }


    public function getLatitude(): ?float
    {
        return $this->getValue($this->table->colLat());
    }


    public function getLongitude(): ?float
    {
        return $this->getValue($this->table->colLon());
    }


    public function getPolygon(): ?string
    {
        return $this->getValue($this->table->colPolygon());
    }
}
