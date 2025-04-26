<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\UploadedPdfInfo;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\StringNumberHelper;


class RestUploadedPdfInfoConverter
{
    const ARG_PDF_PAGE = "page";
    const ARG_PDF_ROTATION = "rotation";
    const ARG_PDF_DPI = "dpi";

    const DEFAULT_PAGE = 0;
    const DEFAULT_ROTATION = 0;
    const DEFAULT_DPI = 200;


    public static function fromRest(array $args): UploadedPdfInfo
    {
        return new UploadedPdfInfo(
            StringNumberHelper::parseIntOrDefault($args, self::ARG_PDF_PAGE, self::DEFAULT_PAGE),
            Angle::fromDeg(StringNumberHelper::parseIntOrDefault($args, self::ARG_PDF_ROTATION, self::DEFAULT_ROTATION)),
            StringNumberHelper::parseIntOrDefault($args, self::ARG_PDF_DPI, self::DEFAULT_DPI)
        );
    }

    /*public static function fromRest(array $pdfInfo): UploadedPdfInfo
    {
        return new UploadedPdfInfo(
            $pdfInfo["pdfPage"],
            Angle::fromDeg($pdfInfo["pdfRotationDeg"]),
            $pdfInfo["pdfDpi"]
        );

        return array(
            "success" => $chartInfo->success,
            "message" => $chartInfo->message,
            "filename" => $chartInfo->originalFileName,
            "type" => $chartInfo->originalFileType,
            "url" => $chartInfo->chartUrl,
        );
    }*/
}
