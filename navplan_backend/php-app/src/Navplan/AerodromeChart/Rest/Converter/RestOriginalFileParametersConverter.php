<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\OriginalFileParameters;


class RestOriginalFileParametersConverter
{
    public static function fromRest(array $args): OriginalFileParameters
    {
        return new OriginalFileParameters(
            $args['importFilename'],
            $args['importChecksum'],
            RestPdfParametersConverter::fromRest($args['pdfParameters'])
        );
    }


    public static function toRest(OriginalFileParameters $originalFileParameters): array
    {
        return array(
            'importFilename' => $originalFileParameters->importFilename,
            'importChecksum' => $originalFileParameters->importChecksum,
            'pdfParameters' => RestPdfParametersConverter::toRest($originalFileParameters->pdfParameters),
        );
    }
}
