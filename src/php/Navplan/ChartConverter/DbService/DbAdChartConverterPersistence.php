<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DbService;

use Navplan\ChartConverter\DbModel\DbAdPdfChartConverter;
use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\ChartConverter\DomainService\AdChartConverterPersistence;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\System\DomainService\IDbService;


class DbAdChartConverterPersistence implements AdChartConverterPersistence {
    public function __construct(
        public IDbService $dbService
    ) {
    }


    public function readAdPdfChart(int $id): AdPdfChart {
        $query = "SELECT * FROM ad_charts2 WHERE ID='" . $id . "'";

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading ad chart");

        return DbAdPdfChartConverter::fromDbResult($result)[0];
    }



    /**
     * @return AdPdfChart[]
     */
    public function readAllAdPdfCharts(): array {
        $query = "SELECT * FROM ad_charts2";

        $result = $this->dbService->execMultiResultQuery($query, "error reading ad pdf charts");

        return DbAdPdfChartConverter::fromDbResult($result);
    }


    public function writeExtent(int $id, Extent2d $extent): void {
        $query = "UPDATE ad_charts2 SET "
            . "     minlon='" . $extent->minPos->longitude . "',"
            . "     minlat='" . $extent->minPos->latitude . "',"
            . "     maxlon='" . $extent->maxPos->longitude . "',"
            . "     maxlat='" . $extent->maxPos->latitude . "'"
            . "   WHERE ID=" . $id;
        $this->dbService->execCUDQuery($query, "error updating password");
    }
}
