<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\ChartSaveParameters;
use Navplan\Common\StringNumberHelper;


class RestChartSaveParametersConverter
{
    public static function fromRest(array $pdfParams): ChartSaveParameters
    {
        return new ChartSaveParameters(
            StringNumberHelper::parseStringOrError($pdfParams, "chartUrl"),
            StringNumberHelper::parseStringOrError($pdfParams, "chartName"),
            RestOriginalFileParametersConverter::fromRest($pdfParams),
            RestChartRegistrationConverter::fromRest($pdfParams)
        );
    }
}
