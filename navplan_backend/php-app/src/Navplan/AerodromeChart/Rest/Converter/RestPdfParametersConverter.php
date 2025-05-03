<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;


class RestPdfParametersConverter
{
    public static function fromRest(array $pdfParams): PdfParameters
    {
        return new PdfParameters(
            $pdfParams["pdfPage"],
            Angle::fromDeg($pdfParams["pdfRotationDeg"]),
            $pdfParams["pdfDpi"]
        );
    }


    public static function toRest(PdfParameters $pdfParams): array
    {
        return array(
            "pdfPage" => $pdfParams->pdfPage,
            "pdfRotationDeg" => $pdfParams->pdfRotation->toDeg(),
            "pdfDpi" => $pdfParams->pdfDpi
        );
    }
}
