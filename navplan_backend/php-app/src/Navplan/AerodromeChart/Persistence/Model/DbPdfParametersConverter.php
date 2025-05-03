<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use Navplan\Common\StringNumberHelper;


class DbPdfParametersConverter
{
    public static function fromDbRow(array $row): ?PdfParameters
    {
        if (StringNumberHelper::isNullOrEmpty($row, DbTableAirportCharts::COL_PDF_PAGE)
            || StringNumberHelper::isNullOrEmpty($row, DbTableAirportCharts::COL_PDF_ROT_DEG)
            || StringNumberHelper::isNullOrEmpty($row, DbTableAirportCharts::COL_IMPORT_FILENAME)
        ) {
            return null;
        }

        return new PdfParameters(
            StringNumberHelper::parseIntOrError($row, DbTableAirportCharts::COL_PDF_PAGE),
            new Angle(StringNumberHelper::parseFloatOrError($row, DbTableAirportCharts::COL_PDF_ROT_DEG), AngleUnit::DEG),
            StringNumberHelper::parseIntOrError($row, DbTableAirportCharts::COL_IMPORT_FILENAME),
        );
    }
}
