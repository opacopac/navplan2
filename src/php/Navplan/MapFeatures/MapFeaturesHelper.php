<?php namespace Navplan\MapFeatures;
include_once __DIR__ . "/../NavplanHelper.php";


class MapFeaturesHelper
{
    public static function reduceDegAccuracy(float $value, string $type): float
    {
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
