<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;


class RestHelper {
    public static function reduceDegAccuracy(float $value, string $type): float {
        switch ($type)  {
            case "AIRSPACE":
                $digits = 4;
                break;
            default:
                $digits = 6;
                break;
        }

        return round($value, $digits);
    }
}
