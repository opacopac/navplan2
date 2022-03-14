<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DbModel;

use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\ChartConverter\DomainModel\AdPngChartRegType;
use Navplan\ChartConverter\DomainModel\Ch1903Coordinate;
use Navplan\ChartConverter\DomainModel\XyPair;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\System\DomainModel\IDbResult;


class DbAdPdfChartConverter {
    /**
     * @return AdPdfChart[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = self::fromDbRow($row);
        }

        return $charts;
    }


    public static function fromDbRow(array $row): AdPdfChart {
        $pos1PixelX = $row["pos1_pixel_x"];
        $pos1PixelY = $row["pos1_pixel_y"];
        $hasPixelPos1 = !($pos1PixelX === null || $pos1PixelY === null);

        $pos2PixelX = $row["pos2_pixel_x"];
        $pos2PixelY = $row["pos2_pixel_y"];
        $hasPixelPos2 = !($pos2PixelX === null || $pos2PixelY === null);

        $pos1Lv03E = $row["pos1_coord_lv03_e"];
        $pos1Lv03N = $row["pos1_coord_lv03_n"];
        $hasCoordPos1 = !($pos1Lv03E === null || $pos1Lv03N === null);

        $pos2Lv03E = $row["pos2_coord_lv03_e"];
        $pos2Lv03N = $row["pos2_coord_lv03_n"];
        $hasCoordPos2 = !($pos2Lv03E === null || $pos2Lv03N === null);

        $chartScale = $row["chart_scale"];

        return new AdPdfChart(
            intval($row["id"]),
            $row["ad_icao"],
            $row["orig_pdf_filename"],
            intval($row["orig_pdf_page"]),
            new Angle(floatval($row["orig_pdf_rot_deg"]), AngleUnit::DEG),
            $row["filename"],
            AdPngChartRegType::fromString($row["registration_type"]),
            $hasPixelPos1 ? new XyPair(intval($pos1PixelX), intval($pos1PixelY)) : null,
            $hasCoordPos1 ? new Ch1903Coordinate(floatval($pos1Lv03E), floatval($pos1Lv03N)) : null,
            $hasPixelPos2 ? new XyPair(intval($pos2PixelX), intval($pos2PixelY)) : null,
            $hasCoordPos2 ? new Ch1903Coordinate(floatval($pos2Lv03E), floatval($pos2Lv03N)) : null,
            $chartScale != null ? intval($chartScale) : null
        );
    }
}
