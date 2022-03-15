<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DbService;

use Navplan\ChartConverter\DbModel\DbImportAdChartConverter;
use Navplan\ChartConverter\DomainModel\ImportAdChart;
use Navplan\ChartConverter\DomainService\IImportAdChartPersistence;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\System\DomainService\IDbService;


class DbImportAdChartPersistence implements IImportAdChartPersistence {
    public function __construct(
        public IDbService $dbService
    ) {
    }


    public function readAdPdfChart(int $id): ImportAdChart {
        $query = "SELECT * FROM ad_charts2 WHERE ID='" . $id . "'";

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading ad chart");

        return DbImportAdChartConverter::fromDbResult($result)[0];
    }



    /**
     * @return ImportAdChart[]
     */
    public function readAllAdPdfCharts(): array {
        $query = "SELECT * FROM ad_charts2";

        $result = $this->dbService->execMultiResultQuery($query, "error reading ad pdf charts");

        return DbImportAdChartConverter::fromDbResult($result);
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
