<?php declare(strict_types=1);

namespace Navplan\Charts\DbRepo;

use Navplan\Charts\DbModel\DbAdChartConverter;
use Navplan\Charts\DomainModel\AdChart;
use Navplan\Charts\DomainService\IChartRepo;
use Navplan\Db\DomainService\IDbService;


class ChartDbRepo implements IChartRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function getAdChartsByIcao(string $adIcao): array {
        $query = "SELECT * FROM ad_charts WHERE airport_icao=" . $this->dbService->escapeAndQuoteString($adIcao);

        $result = $this->dbService->execMultiResultQuery($query, "error reading AD charts by icao");

        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = DbAdChartConverter::fromDbRow($row);
        }

        return $charts;
    }


    public function getAdChartById(int $id): AdChart {
        $query = "SELECT * FROM ad_charts WHERE id=" . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading AD chart by id");

        $row = $result->fetch_assoc();
        return DbAdChartConverter::fromDbRow($row);
    }
}
