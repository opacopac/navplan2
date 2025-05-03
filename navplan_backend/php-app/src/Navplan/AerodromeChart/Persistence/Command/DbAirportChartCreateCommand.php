<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Command;

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
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


    public function create(AirportChart $airportChart, int $userId): AirportChart
    {
        $query = $this->getAirportChartInsertSql($airportChart, $userId);
        $this->dbService->execCUDQuery($query, "error creating airport chart");
        $airportChart->id = $this->dbService->getInsertId();

        return $airportChart;
    }


    private function getAirportChartInsertSql(AirportChart $airportChart, int $userId): string
    {
        $query = "INSERT INTO " . DbTableAirportCharts::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableAirportCharts::COL_AD_ICAO,
            DbTableAirportCharts::COL_SOURCE,
            DbTableAirportCharts::COL_NAME,
            DbTableAirportCharts::COL_ACTIVE,
            DbTableAirportCharts::COL_FILENAME,
            DbTableAirportCharts::COL_MINLON,
            DbTableAirportCharts::COL_MINLAT,
            DbTableAirportCharts::COL_MAXLON,
            DbTableAirportCharts::COL_MAXLAT,
            DbTableAirportCharts::COL_IMPORT_FILENAME,
            DbTableAirportCharts::COL_IMPORT_CHECKSUM,
            DbTableAirportCharts::COL_PDF_PAGE,
            DbTableAirportCharts::COL_PDF_ROT_DEG,
            DbTableAirportCharts::COL_PDF_DPI,
            DbTableAirportCharts::COL_REGISTRATION_TYPE,
            DbTableAirportCharts::COL_GEOCOORD_TYPE,
            DbTableAirportCharts::COL_POS1_PIXEL_X,
            DbTableAirportCharts::COL_POS1_PIXEL_Y,
            DbTableAirportCharts::COL_POS1_GEOCOORD_E,
            DbTableAirportCharts::COL_POS1_GEOCOORD_N,
            DbTableAirportCharts::COL_CHART_SCALE,
            DbTableAirportCharts::COL_POS2_PIXEL_X,
            DbTableAirportCharts::COL_POS2_PIXEL_Y,
            DbTableAirportCharts::COL_POS2_GEOCOORD_E,
            DbTableAirportCharts::COL_POS2_GEOCOORD_N,
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbStringValue($this->dbService, $airportChart->airportIcao),
            DbHelper::getDbStringValue($this->dbService, $airportChart->source),
            DbHelper::getDbStringValue($this->dbService, $airportChart->name),
            1,
            DbHelper::getDbStringValue($this->dbService, $airportChart->filename),
            DbHelper::getDbFloatValue($airportChart->extent->minPos->longitude),
            DbHelper::getDbFloatValue($airportChart->extent->minPos->latitude),
            DbHelper::getDbFloatValue($airportChart->extent->maxPos->longitude),
            DbHelper::getDbFloatValue($airportChart->extent->maxPos->latitude),
            DbHelper::getDbStringValue($this->dbService, $airportChart->originalFileParameters->importFilename),
            DbHelper::getDbStringValue($this->dbService, $airportChart->originalFileParameters->importChecksum),
            DbHelper::getDbIntValue($airportChart->originalFileParameters->pdfParameters?->page),
            DbHelper::getDbFloatValue($airportChart->originalFileParameters->pdfParameters?->rotation->toDeg()),
            DbHelper::getDbIntValue($airportChart->originalFileParameters->pdfParameters?->dpi),
            DbHelper::getDbStringValue($this->dbService, $airportChart->chartRegistration->registrationType->value),
            DbHelper::getDbStringValue($this->dbService, $airportChart->chartRegistration->coordinateType->value),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy1->getIntX()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy1->getIntY()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->geoCoord1->getE()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->geoCoord1->getN()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->scale),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy2?->getIntX()),
            DbHelper::getDbIntValue($airportChart->chartRegistration->pixelXy2?->getIntY()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->geoCoord2?->getE()),
            DbHelper::getDbFloatValue($airportChart->chartRegistration->geoCoord2?->getN()),
        ]);
        $query .= ")";

        return $query;
    }
}
