<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\UseCase\ReadVerticalMap\ReadVerticalMapResponse;


class ReadVerticalMapResponseConverter {
    public static function toRest(ReadVerticalMapResponse $response): array {
        return array(
            'verticalMap' => VerticalMapConverter::toRest($response->verticalMap)
        );
    }
}
