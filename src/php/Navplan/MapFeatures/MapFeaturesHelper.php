<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use InvalidArgumentException;

include_once __DIR__ . "/../NavplanHelper.php";


class MapFeaturesHelper
{
    public static function reduceDegAccuracy($value, string $type): float
    {
        if (!is_numeric($value)) {
            throw new InvalidArgumentException("value is not numeric: " . $value);
        }

        switch ($type)
        {
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
