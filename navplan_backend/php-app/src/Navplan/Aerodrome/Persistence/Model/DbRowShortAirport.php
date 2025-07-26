<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
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


    public function getPosition(): Position2d
    {
        return DbPosition2dConverter::fromDbRow($this->row);
    }


    public function getRwyDirection(): ?int
    {
        return $this->getValue($this->tRwy->colDirection(), true);
    }


    public function getRwySurface(): ?string
    {
        return $this->getValue($this->tRwy->colSurface(), true);
    }


    public function getFeatures(): array
    {
        $features = $this->row["features"];
        return $features ? explode(",", $features) : [];
    }
}
