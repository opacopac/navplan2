<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use Navplan\Common\Rest\Converter\RestAngleConverter;
use Navplan\Common\StringNumberHelper;


class RestPdfParametersConverter
{
    public static function fromRest(?array $pdfParams): ?PdfParameters
    {
        if (!$pdfParams || !isset($pdfParams["page"]) || !isset($pdfParams["rotationDeg"]) || !isset($pdfParams["dpi"])) {
            return null;
        }

        return new PdfParameters(
            StringNumberHelper::parseIntOrZero($pdfParams, "page"),
            new Angle(StringNumberHelper::parseFloatOrZero($pdfParams, "rotationDeg"), AngleUnit::DEG),
            StringNumberHelper::parseIntOrZero($pdfParams, "dpi")
        );
    }


    public static function toRest(?PdfParameters $pdfParams): ?array
    {
        if ($pdfParams === null) {
            return null;
        }

        return array(
            "page" => $pdfParams->page,
            "rotationDeg" => $pdfParams->rotation->toDeg(),
            "dpi" => $pdfParams->dpi
        );
    }
}
