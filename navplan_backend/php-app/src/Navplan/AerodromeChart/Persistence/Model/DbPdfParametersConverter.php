<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use Navplan\Common\StringNumberHelper;


class DbPdfParametersConverter
{
    public static function fromDbRow(array $row): PdfParameters
    {
        return new PdfParameters(
            StringNumberHelper::parseIntOrZero($row, DbTableAirportCharts::COL_PDF_PAGE),
            new Angle(StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_PDF_ROT_DEG), AngleUnit::DEG),
            200 // TODO
        );
    }
}
