<?php declare(strict_types=1);

namespace Navplan\Shared\Domain;


use Navplan\Shared\InvalidFormatException;

class Polygon {
    public $lonLatList = [];


    /**
     * @param string $polygonString
     * @param string $posSeparator
     * @param string $lonLatSeparator
     * @return Polygon
     * @throws InvalidFormatException
     */
    public static function createFromString(string $polygonString, string $posSeparator = ',', string $lonLatSeparator = ' '): Polygon {
        $lonLatList = [];
        $posStringList = explode($posSeparator, $polygonString);
        foreach ($posStringList as $posString) {
            $lonLat = explode($lonLatSeparator, trim($posString));
            if (count($lonLat) === 2 && is_numeric(trim($lonLat[0])) && is_numeric(trim($lonLat[1]))) {
                $lonLatList[] = [floatval(trim($lonLat[0])), floatval(trim($lonLat[1]))];
            } else {
                throw new InvalidFormatException('wrong format near "' . $posString . '" of polygon "' . $polygonString . '"');
            }
        }

        return new Polygon($lonLatList);
    }


    public function __construct(array $lonLatList = []) {
        $this->lonLatList = $lonLatList;
    }


    public function toString(string $posSeparator = ',', string $lonLatSeparator = ' '): string {
        $posStringList = [];
        foreach ($this->lonLatList as $lonLat) {
            $posStringList[] = join($lonLatSeparator, $lonLat);
        }

        return join($posSeparator, $posStringList);
    }
}
