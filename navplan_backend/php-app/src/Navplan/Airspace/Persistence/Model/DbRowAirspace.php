<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\Domain\Model\Ring2d;
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


    public function getAltTop(): Altitude
    {
        return $this->getAltitude(
            $this->getValue($this->table->colAltTopHeight()),
            $this->getValue($this->table->colAltTopUnit()),
            $this->getValue($this->table->colAltTopRef())
        );
    }


    public function getAltBottom(): Altitude
    {
        return $this->getAltitude(
            $this->getValue($this->table->colAltBotHeight()),
            $this->getValue($this->table->colAltBotUnit()),
            $this->getValue($this->table->colAltBotRef())
        );
    }


    public function getDiameter(): ?float
    {
        return $this->getValue($this->table->colDiameter());
    }


    public function getPolygon(): ?Ring2d
    {
        return Ring2d::createFromString($this->getValue($this->table->colPolygon(), true));
    }


    public function getExtent(): string
    {
        return $this->getValue($this->table->colExtent());
    }


    private function getAltitude(int $height, string $unitStr, string $refStr): Altitude
    {
        return new Altitude(
            $height,
            AltitudeUnit::from($unitStr === "F" ? "FT" : $unitStr),
            AltitudeReference::from($refStr)
        );
    }
}
