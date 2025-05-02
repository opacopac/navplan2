<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Command;

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Model\AirportChart2;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirportChartCreateCommand implements IAirportChartCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(AirportChart2 $airportChart, int $userId): AirportChart2
    {
        $query = $this->getAirportChartInsertSql($airportChart, $userId);
        $this->dbService->execCUDQuery($query, "error creating airport chart");
        $airportChart->id = $this->dbService->getInsertId();

        return $airportChart;
    }


    private function getAirportChartInsertSql(AirportChart2 $airportChart, int $userId): string
    {
        $query = "INSERT INTO " . DbTableAirportCharts::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableAirportCharts::COL_AD_ICAO,
            DbTableAirportCharts::COL_SOURCE,
            DbTableAirportCharts::COL_TYPE,
            DbTableAirportCharts::COL_FILENAME,
            DbTableAirportCharts::COL_MINLON,
            DbTableAirportCharts::COL_MINLAT,
            DbTableAirportCharts::COL_MAXLON,
            DbTableAirportCharts::COL_MAXLAT,
            DbTableAirportCharts::COL_IMPORT_FILENAME,
            DbTableAirportCharts::COL_PDF_PAGE,
            DbTableAirportCharts::COL_PDF_ROT_DEG,
            DbTableAirportCharts::COL_REGISTRATION_TYPE,
            DbTableAirportCharts::COL_POS1_PIXEL_X,
            DbTableAirportCharts::COL_POS1_PIXEL_Y,
            DbTableAirportCharts::COL_POS1_COORD_LV03_E,
            DbTableAirportCharts::COL_POS1_COORD_LV03_N,
            DbTableAirportCharts::COL_CHART_SCALE,
            DbTableAirportCharts::COL_POS2_PIXEL_X,
            DbTableAirportCharts::COL_POS2_PIXEL_Y,
            DbTableAirportCharts::COL_POS2_COORD_LV03_E,
            DbTableAirportCharts::COL_POS2_COORD_LV03_N,
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbStringValue($this->dbService, $airportChart->airportIcao),
            DbHelper::getDbStringValue($this->dbService, $airportChart->source),
            DbHelper::getDbStringValue($this->dbService, $airportChart->type),
            DbHelper::getDbStringValue($this->dbService, $airportChart->filename),
            DbHelper::getDbFloatValue($airportChart->extent->minPos->longitude),
            DbHelper::getDbFloatValue($airportChart->extent->minPos->latitude),
            DbHelper::getDbFloatValue($airportChart->extent->maxPos->longitude),
            DbHelper::getDbFloatValue($airportChart->extent->maxPos->latitude),
            DbHelper::getDbStringValue($this->dbService, $airportChart->originalFileParameters->importFilename),
            DbHelper::getDbIntValue($airportChart->originalFileParameters->pdfParameters?->pdfPage),
            DbHelper::getDbFloatValue($airportChart->originalFileParameters->pdfParameters?->pdfRotation->toDeg()),
            DbHelper::getDbStringValue($this->dbService, $airportChart->chartRegistration->registrationType->value),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy1->getIntX()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy1->getIntY()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->geoCoord1->getIntE()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->geoCoord1->getIntN()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->scale),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy2?->getIntX()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy2?->getIntY()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->geoCoord2?->getIntE()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->geoCoord2?->getIntN()),
        ]);
        $query .= ")";

        return $query;
    }
}
