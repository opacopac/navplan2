<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DbService;

use Navplan\ChartConverter\DbModel\DbAdPdfChartConverter;
use Navplan\ChartConverter\DbModel\DbAdPngCh1903ChartConverter;
use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\ChartConverter\DomainModel\AdPngCh1903Chart;
use Navplan\ChartConverter\DomainService\AdChartConverterPersistence;
use Navplan\System\DomainService\IDbService;


class DbAdChartConverterPersistence implements AdChartConverterPersistence {
    public function __construct(
        public IDbService $dbService
    ) {
    }


    /**
     * @return AdPdfChart[]
     */
    public function readAllAdPdfCharts(): array {
        $query = "SELECT id, orig_pdf_filename, orig_pdf_page, orig_pdf_rot_deg, orig_png_filename"
            . "   FROM ad_charts2";

        $result = $this->dbService->execMultiResultQuery($query, "error reading ad pdf charts");

        return DbAdPdfChartConverter::fromDbResult($result);
    }


    /**
     * @return AdPngCh1903Chart[]
     */
    public function readAllAdPngCh1903Charts(): array {
        $query = "SELECT id, ad_icao, filename, orig_png_filename, registration_type, pos1_pixel_x, pos1_pixel_y, pos1_coord_lv03_e, pos1_coord_lv03_n, chart_scale"
            . "   FROM ad_charts2";

        $result = $this->dbService->execMultiResultQuery($query, "error reading ad png charts");

        return DbAdPngCh1903ChartConverter::fromDbResult($result);
    }
}
