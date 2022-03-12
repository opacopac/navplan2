<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DbModel;

use Navplan\IcaoChartCh\DomainModel\AdPngCh1903Chart;
use Navplan\IcaoChartCh\DomainModel\AdPngChartRegType;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use Navplan\IcaoChartCh\DomainModel\XyPair;
use Navplan\System\DomainModel\IDbResult;


class DbAdPngCh1903ChartConverter {
    /**
     * @return AdPngCh1903Chart[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = self::fromDbRow($row);
        }

        return $charts;
    }


    public static function fromDbRow(array $row): AdPngCh1903Chart {
        $pos1PixelX = $row["pos1_pixel_x"];
        $pos1PixelY = $row["pos1_pixel_y"];
        $hasPixelPos1 = !($pos1PixelX === null || $pos1PixelY === null);

        $pos1Lv03E = $row["pos1_coord_lv03_e"];
        $pos1Lv03N = $row["pos1_coord_lv03_n"];
        $hasCoordPos1 = !($pos1Lv03E === null || $pos1Lv03N === null);

        $chartScale = $row["chart_scale"];

        return new AdPngCh1903Chart(
            intval($row["id"]),
            $row["ad_icao"],
            $row["orig_png_filename"],
            AdPngChartRegType::fromString($row["registration_type"]),
            $hasPixelPos1 ? new XyPair(intval($pos1PixelX), intval($pos1PixelY)) : null,
            $hasCoordPos1 ? new Ch1903Coordinate(floatval($pos1Lv03E), floatval($pos1Lv03N)) : null,
            $chartScale != null ? intval($chartScale) : null,
            $row["filename"]
        );
    }
}
