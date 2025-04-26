<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\VfrmChartParams;


class VfrmService
{
    public static $DEFAULT_SCALE_VAC = 100000;
    public static $DEFAULT_SCALE_AREA = 250000;
    public static $DEFAULT_SCALE_ADINFO1 = 10000;
    public static $DEFAULT_SCALE_ADINFO2 = 0;


    public static function getVfrmChartNameProposal(string $filename): ?VfrmChartParams
    {
        $pattern = '/^LS_ADINFO_0000_(\w{4})_?(.*)\.pdf$/';
        if (!preg_match($pattern, $filename, $matches)) {
            //throw new InvalidArgumentException("file name pattern unknown: " . $filename);
            return null;
        }

        $icao = $matches[1];
        $chartsuffix = $matches[2];

        switch ($chartsuffix) {
            case "" :
                $chartname = "AD INFO 1";
                $scale = self::$DEFAULT_SCALE_ADINFO1;
                break;
            //case "02" : $chartname = "AD INFO 2"; $scale = $scaleAdInfo2; break;
            case "VAC" :
                $chartname = "VAC";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            case "VAC_D" :
                $chartname = "VAC Departure";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            case "VAC_A" :
                $chartname = "VAC Arrival";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            case "AREA" :
                $chartname = "AREA";
                $scale = self::$DEFAULT_SCALE_AREA;
                break;
            case "AREA_D" :
                $chartname = "AREA Departure";
                $scale = self::$DEFAULT_SCALE_AREA;
                break;
            case "AREA_A" :
                $chartname = "AREA Arrival";
                $scale = self::$DEFAULT_SCALE_AREA;
                break;
            case "HEL" :
                $chartname = "HEL";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            case "HEL_D" :
                $chartname = "HEL Departure";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            case "HEL_A" :
                $chartname = "HEL Arrival";
                $scale = self::$DEFAULT_SCALE_VAC;
                break;
            default :
                return null;
        }

        return new VfrmChartParams(
            $icao,
            $chartname,
            $scale
        );
    }
}
