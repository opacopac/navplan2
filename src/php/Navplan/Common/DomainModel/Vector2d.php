<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


class Vector2d {
    public function __construct(
        public float $x,
        public float $y
    ) {
    }


    public function add(float $addX, float $addY): void {
        $this->x += $addX;
        $this->y += $addY;
    }


    public function rotate(Angle $angle): void {
        $angleRad = $angle->toRad();
        $xRot = $this->x * cos($angleRad) - $this->y * sin($angleRad);
        $yRot = $this->x * sin($angleRad) + $this->y * cos($angleRad);
        $this->x = $xRot;
        $this->y = $yRot;
    }
}
