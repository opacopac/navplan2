<?php declare(strict_types=1);

namespace Navplan\Fir\Persistence\Model;

use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Fir\Domain\Model\Fir;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<Fir>
 */
class DbFirConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableFir $table)
    {
    }


    /**
     * @param array $row
     * @return Fir
     */
    public function fromDbRow(array $row): Fir
    {
        $r = new DbRowFir($this->table, $row);

        return new Fir(
            $r->getId(),
            $r->getRegion(),
            $r->getIcao(),
            $r->getName(),
            $r->getStateCode(),
            $r->getStateName(),
            Position2d::fromLonLat($r->getCenterLon(), $r->getCenterLat()),
            $this->parseMultiPolygonFromWkt($r->getPolygon())
        );
    }


    /**
     * Parse WKT MULTIPOLYGON format to MultiRing2d
     * Example: MULTIPOLYGON(((lon1 lat1,lon2 lat2,...)))
     */
    private function parseMultiPolygonFromWkt(string $wktString): MultiRing2d
    {
        // Remove MULTIPOLYGON wrapper and trim
        $wktString = trim($wktString);
        $wktString = preg_replace('/^MULTIPOLYGON\s*\(/i', '', $wktString);
        $wktString = preg_replace('/\)$/', '', $wktString);

        // Split into individual polygons
        $polygons = [];
        $depth = 0;
        $currentPolygon = '';

        for ($i = 0; $i < strlen($wktString); $i++) {
            $char = $wktString[$i];

            if ($char === '(') {
                $depth++;
                if ($depth > 1) {
                    $currentPolygon .= $char;
                }
            } elseif ($char === ')') {
                $depth--;
                if ($depth === 0) {
                    if (!empty(trim($currentPolygon))) {
                        $polygons[] = $this->parsePolygonCoordinates($currentPolygon);
                    }
                    $currentPolygon = '';
                } elseif ($depth > 0) {
                    $currentPolygon .= $char;
                }
            } elseif ($depth > 0) {
                $currentPolygon .= $char;
            }
        }

        return MultiRing2d::createFromArray($polygons);
    }


    /**
     * Parse polygon coordinates from string
     * Example: "(lon1 lat1,lon2 lat2,lon3 lat3)"
     */
    private function parsePolygonCoordinates(string $coordString): array
    {
        $coordString = trim($coordString);
        // Remove any wrapping parentheses
        $coordString = preg_replace('/^\(+/', '', $coordString);
        $coordString = preg_replace('/\)+$/', '', $coordString);

        $coordinates = [];
        $pairs = explode(',', $coordString);

        foreach ($pairs as $pair) {
            $pair = trim($pair);
            if (empty($pair)) {
                continue;
            }

            $coords = preg_split('/\s+/', $pair);
            if (count($coords) >= 2) {
                $coordinates[] = [floatval($coords[0]), floatval($coords[1])];
            }
        }

        return $coordinates;
    }
}

