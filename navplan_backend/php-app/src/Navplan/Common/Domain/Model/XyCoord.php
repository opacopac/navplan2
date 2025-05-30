<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class XyCoord
{
    public function __construct(
        public float $x,
        public float $y
    )
    {
    }


    public function getIntX(): int
    {
        return (int) round($this->x);
    }


    public function getIntY(): int
    {
        return (int) round($this->y);
    }


    public function toArray(): array
    {
        return [$this->x, $this->y];
    }
}
