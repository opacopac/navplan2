<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;

class ValueGrid {
    public function __construct(
        public GridDefinition $gridDefinition,
        public array $values,
        private $convertFromBinToValueFn = NULL
    ) {
        if (count($this->values) != $this->gridDefinition->width * $this->gridDefinition->height) {
            throw new InvalidArgumentException("number of values doesn't match grid definition");
        }
    }


    public function getValueByXy(int $x, int $y): float|null {
        if ($x < 0 || $y < 0 || $x >= $this->gridDefinition->width || $y >= $this->gridDefinition->height) {
            return null;
        }

        $idx = $x + $y * $this->gridDefinition->width;
        $value = $this->values[$idx];

        if (is_callable($this->convertFromBinToValueFn)) {
            $value = ($this->convertFromBinToValueFn)($value);
        }

        return $value;
    }


    public function interpolateByLonLat(Position2d $pos): float|null {
        $x = $this->gridDefinition->getXbyLon($pos->longitude);
        $y = $this->gridDefinition->getYbyLat($pos->latitude);

        $x_floor = (int) floor($x);
        $y_floor = (int) floor($y);
        $x_ceil = (int) ceil($x);
        $y_ceil = (int) ceil($y);

        if ($x_ceil < 0 || $y_ceil < 0 || $x_floor >= $this->gridDefinition->width || $y_floor >= $this->gridDefinition->height) {
            return null;
        }

        if ($x_floor == $x_ceil || $y_floor == $y_ceil) {
            return $this->getValueByXy($x_floor, $y_floor);
        }

        $val_tl = $this->getValueByXy($x_floor, $y_floor);
        $val_tr = $this->getValueByXy($x_ceil, $y_floor);
        $val_bl = $this->getValueByXy($x_floor, $y_ceil);
        $val_br = $this->getValueByXy($x_ceil, $y_ceil);
        $val_t = $this->interpolateValue($val_tl, $x_ceil - $x, $val_tr, $x - $x_floor);
        $val_b = $this->interpolateValue($val_bl, $x_ceil - $x, $val_br, $x - $x_floor);
        $val = $this->interpolateValue($val_t, $y_ceil - $y, $val_b, $y - $y_floor);

        return $val;
    }


    private function interpolateValue(float|null $value1, float $weight1, float|null $value2, float $weight2): float|null {
        if ($value1 === null || $value2 === null) {
            return null;
        }

        return $value1 * $weight1 + $value2 * $weight2;
    }
}
