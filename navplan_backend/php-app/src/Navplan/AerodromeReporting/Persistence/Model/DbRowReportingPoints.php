<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
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


    public function getPosition(): ?Position2d
    {
        return DbPosition2dConverter::fromDbRow($this->row); // TODO
    }


    public function getPolygon(): ?string
    {
        return $this->getValue($this->table->colPolygon());
    }
}
