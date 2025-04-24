<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;


class RestUploadedChartInfoConverter
{
    public static function toRest(UploadedChartInfo $chartInfo): array
    {
        return array(
            "success" => $chartInfo->success,
            "message" => $chartInfo->message,
            "filename" => $chartInfo->filename,
            "type" => $chartInfo->type,
            "url" => $chartInfo->url,
        );
    }
}
