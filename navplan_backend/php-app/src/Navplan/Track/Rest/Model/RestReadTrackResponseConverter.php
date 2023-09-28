<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Model;

use Navplan\Track\Domain\Model\Track;


class RestReadTrackResponseConverter {
    public static function toRest(Track $track): array {
        return array(
            "track" => RestTrackConverter::toRest($track)
        );
    }
}
