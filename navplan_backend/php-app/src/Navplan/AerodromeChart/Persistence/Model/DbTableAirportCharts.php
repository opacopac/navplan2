<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAirportCharts extends DbTable
{
    public const TABLE_NAME = "ad_charts2";
    public const COL_ID = "id";
    public const COL_AD_ICAO = "ad_icao";
    public const COL_USER_ID = "user_id";
    public const COL_SOURCE = "source";
    public const COL_NAME = "name";
    public const COL_ACTIVE = "active";
    public const COL_FILENAME = "filename";
    public const COL_MINLON = "minlon";
    public const COL_MINLAT = "minlat";
    public const COL_MAXLON = "maxlon";
    public const COL_MAXLAT = "maxlat";
    public const COL_IMPORT_FILENAME = "import_filename";
    public const COL_IMPORT_CHECKSUM = "import_checksum";
    public const COL_PDF_PAGE = "pdf_page";
    public const COL_PDF_ROT_DEG = "pdf_rot_deg";
    public const COL_PDF_DPI = "pdf_dpi";
    public const COL_REGISTRATION_TYPE = "registration_type";
    public const COL_GEOCOORD_TYPE = "geocoord_type";
    public const COL_POS1_PIXEL_X = "pos1_pixel_x";
    public const COL_POS1_PIXEL_Y = "pos1_pixel_y";
    public const COL_POS1_GEOCOORD_E = "pos1_geocoord_e";
    public const COL_POS1_GEOCOORD_N = "pos1_geocoord_n";
    public const COL_CHART_SCALE = "chart_scale";
    public const COL_POS2_PIXEL_X = "pos2_pixel_x";
    public const COL_POS2_PIXEL_Y = "pos2_pixel_y";
    public const COL_POS2_GEOCOORD_E = "pos2_geocoord_e";
    public const COL_POS2_GEOCOORD_N = "pos2_geocoord_n";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);

        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_AD_ICAO, DbColType::STRING);
        $this->addCol(self::COL_USER_ID, DbColType::INT, true);
        $this->addCol(self::COL_SOURCE, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_ACTIVE, DbColType::BOOL);
        $this->addCol(self::COL_FILENAME, DbColType::STRING);
        $this->addCol(self::COL_MINLON, DbColType::DOUBLE);
        $this->addCol(self::COL_MINLAT, DbColType::DOUBLE);
        $this->addCol(self::COL_MAXLON, DbColType::DOUBLE);
        $this->addCol(self::COL_MAXLAT, DbColType::DOUBLE);
        $this->addCol(self::COL_IMPORT_FILENAME, DbColType::STRING);
        $this->addCol(self::COL_IMPORT_CHECKSUM, DbColType::STRING);
        $this->addCol(self::COL_PDF_PAGE, DbColType::INT, true);
        $this->addCol(self::COL_PDF_ROT_DEG, DbColType::DOUBLE, true);
        $this->addCol(self::COL_PDF_DPI, DbColType::INT, true);
        $this->addCol(self::COL_REGISTRATION_TYPE, DbColType::STRING);
        $this->addCol(self::COL_GEOCOORD_TYPE, DbColType::STRING);
        $this->addCol(self::COL_POS1_PIXEL_X, DbColType::INT, true);
        $this->addCol(self::COL_POS1_PIXEL_Y, DbColType::INT, true);
        $this->addCol(self::COL_POS1_GEOCOORD_E, DbColType::DOUBLE, true);
        $this->addCol(self::COL_POS1_GEOCOORD_N, DbColType::DOUBLE, true);
        $this->addCol(self::COL_CHART_SCALE, DbColType::INT, true);
        $this->addCol(self::COL_POS2_PIXEL_X, DbColType::INT, true);
        $this->addCol(self::COL_POS2_PIXEL_Y, DbColType::INT, true);
        $this->addCol(self::COL_POS2_GEOCOORD_E, DbColType::DOUBLE, true);
        $this->addCol(self::COL_POS2_GEOCOORD_N, DbColType::DOUBLE, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colAdIcao(): DbCol
    {
        return self::getCol(self::COL_AD_ICAO);
    }


    public function colUserId(): DbCol
    {
        return self::getCol(self::COL_USER_ID);
    }


    public function colSource(): DbCol
    {
        return self::getCol(self::COL_SOURCE);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colActive(): DbCol
    {
        return self::getCol(self::COL_ACTIVE);
    }


    public function colFilename(): DbCol
    {
        return self::getCol(self::COL_FILENAME);
    }


    public function colMinLon(): DbCol
    {
        return self::getCol(self::COL_MINLON);
    }


    public function colMinLat(): DbCol
    {
        return self::getCol(self::COL_MINLAT);
    }


    public function colMaxLon(): DbCol
    {
        return self::getCol(self::COL_MAXLON);
    }


    public function colMaxLat(): DbCol
    {
        return self::getCol(self::COL_MAXLAT);
    }


    public function colImportFilename(): DbCol
    {
        return self::getCol(self::COL_IMPORT_FILENAME);
    }


    public function colImportChecksum(): DbCol
    {
        return self::getCol(self::COL_IMPORT_CHECKSUM);
    }


    public function colPdfPage(): DbCol
    {
        return self::getCol(self::COL_PDF_PAGE);
    }


    public function colPdfRotDeg(): DbCol
    {
        return self::getCol(self::COL_PDF_ROT_DEG);
    }


    public function colPdfDpi(): DbCol
    {
        return self::getCol(self::COL_PDF_DPI);
    }


    public function colRegistrationType(): DbCol
    {
        return self::getCol(self::COL_REGISTRATION_TYPE);
    }


    public function colGeocoordType(): DbCol
    {
        return self::getCol(self::COL_GEOCOORD_TYPE);
    }


    public function colPos1PixelX(): DbCol
    {
        return self::getCol(self::COL_POS1_PIXEL_X);
    }


    public function colPos1PixelY(): DbCol
    {
        return self::getCol(self::COL_POS1_PIXEL_Y);
    }


    public function colPos1GeocoordE(): DbCol
    {
        return self::getCol(self::COL_POS1_GEOCOORD_E);
    }


    public function colPos1GeocoordN(): DbCol
    {
        return self::getCol(self::COL_POS1_GEOCOORD_N);
    }


    public function colChartScale(): DbCol
    {
        return self::getCol(self::COL_CHART_SCALE);
    }


    public function colPos2PixelX(): DbCol
    {
        return self::getCol(self::COL_POS2_PIXEL_X);
    }


    public function colPos2PixelY(): DbCol
    {
        return self::getCol(self::COL_POS2_PIXEL_Y);
    }


    public function colPos2GeocoordE(): DbCol
    {
        return self::getCol(self::COL_POS2_GEOCOORD_E);
    }


    public function colPos2GeocoordN(): DbCol
    {
        return self::getCol(self::COL_POS2_GEOCOORD_N);
    }
}
