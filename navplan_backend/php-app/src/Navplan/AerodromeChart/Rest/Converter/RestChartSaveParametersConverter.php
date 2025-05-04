<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\ChartSaveParameters;
use Navplan\Common\StringNumberHelper;


class RestChartSaveParametersConverter
{
    public static function fromRest(array $args): ChartSaveParameters
    {
        return new ChartSaveParameters(
            StringNumberHelper::parseStringOrError($args, "chartUrl"),
            StringNumberHelper::parseStringOrError($args, "chartName"),
            RestOriginalFileParametersConverter::fromRest($args['originalFileParameters']),
            RestChartRegistrationConverter::fromRest($args['chartRegistration']),
        );
    }
}
