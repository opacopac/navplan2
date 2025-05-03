<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use Navplan\Common\Rest\Converter\RestAngleConverter;
use Navplan\Common\StringNumberHelper;


class RestPdfParametersConverter
{
    public static function fromRest(array $pdfParams): PdfParameters
    {
        return new PdfParameters(
            StringNumberHelper::parseIntOrZero($pdfParams, "page"),
            new Angle(StringNumberHelper::parseFloatOrZero($pdfParams, "rotationDeg"), AngleUnit::DEG),
            StringNumberHelper::parseIntOrZero($pdfParams, "dpi")
        );
    }


    public static function toRest(PdfParameters $pdfParams): array
    {
        return array(
            "page" => $pdfParams->page,
            "rotation" => RestAngleConverter::toRest($pdfParams->rotation),
            "dpi" => $pdfParams->dpi
        );
    }
}
