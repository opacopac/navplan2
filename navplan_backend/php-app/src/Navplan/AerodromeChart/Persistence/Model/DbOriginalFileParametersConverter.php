<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\OriginalFileParameters;


class DbOriginalFileParametersConverter
{
    public static function fromDbRow(array $row): OriginalFileParameters
    {
        return new OriginalFileParameters(
            $row[DbTableAirportCharts::COL_IMPORT_FILENAME],
            DbPdfParametersConverter::fromDbRow($row),
        );
    }
}
