<?php declare(strict_types=1);

namespace Navplan\Common\Domain\SwissTopo;

require_once 'wgs84_ch1903.php';


class SwissTopoService {
    // Convert WGS lat/long (° dec) to CH y (E)
    public static function WgsToChE(float $lat, float $long): float {
        return WGStoCHy($lat, $long);
    }


    // Convert WGS lat/long (° dec) to CH x (N)
    public static function WgsToChN(float $lat, float $long): float {
        return WGStoCHx($lat, $long);
    }


    // Convert CH y/x to WGS lat
    public static function ChToWgsLat(float $e, float $n): float {
        return CHtoWGSlat($e, $n);
    }


    // Convert CH y/x to WGS long
    public static function ChToWgsLong(float $e, float $n): float {
        return CHtoWGSlong($e, $n);
    }
}
