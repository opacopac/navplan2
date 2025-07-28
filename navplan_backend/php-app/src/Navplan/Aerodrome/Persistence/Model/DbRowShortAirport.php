<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowShortAirport extends DbRow
{
    public function __construct(
        private readonly DbTableAirport $tAd,
        private readonly DbTableAirportRunway $tRwy,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->tAd->colId());
    }


    public function getType(): string
    {
        return $this->getValue($this->tAd->colType());
    }


    public function getIcao(): ?string
    {
        return $this->getValue($this->tAd->colIcao());
    }


    public function getLatitude(): float
    {
        return $this->getValue($this->tAd->colLatitude(), true);
    }


    public function getLongitude(): float
    {
        return $this->getValue($this->tAd->colLongitude(), true);
    }


    public function getRwyDirection(): ?int
    {
        return $this->getValue($this->tRwy->colDirection(), true);
    }


    public function getRwySurface(): ?string
    {
        return $this->getValue($this->tRwy->colSurface(), true);
    }


    public function getFeatures(): ?string
    {
        return $this->row["features"];
    }
}
