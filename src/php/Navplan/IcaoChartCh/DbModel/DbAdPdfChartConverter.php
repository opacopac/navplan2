<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DbModel;

use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\IcaoChartCh\DomainModel\AdPdfChart;
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
        return new AdPdfChart(
            intval($row["id"]),
            $row["orig_pdf_filename"],
            intval($row["orig_pdf_page"]),
            new Angle(floatval($row["orig_pdf_rot_deg"]), AngleUnit::DEG),
            $row["orig_png_filename"]
        );
    }
}
