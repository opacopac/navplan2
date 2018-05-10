<?php
require_once __DIR__ . "/LineLonLat.php";
require_once __DIR__ . "/../services/GeoService.php";


class PolygonLonLat extends LineLonLat {
    public function __construct() {
        parent::__construct();
    }


    public function getSimplifiedShape($epsilon) {
        $numPoints = count($this->points);
        if ($numPoints <= 3) {
            return clone $this;
        }

        // find most distant point from first point
        $distMax = 0;
        $mostDistantPointIndex = 1;
        for ($i = 1; $i < $numPoints - 1; $i++) {
            $dist = GeoService::calcDistance($this->points[0], $this->points[$i]);
            if ($dist >= $distMax) {
                $distMax = $dist;
                $mostDistantPointIndex = $i;
            }
        }

        // simplify polygon as 2 separate lines
        $subLine1 = GeoService::simplifyLine(array_slice($this->points, 0, $mostDistantPointIndex + 1), $epsilon);
        $subLine2 = GeoService::simplifyLine(array_slice($this->points, $mostDistantPointIndex), $epsilon);

        return self::createFromArray(array_merge($subLine1, array_slice($subLine2, 1)));
    }
}
