<?php declare(strict_types=1);

namespace Navplan\Track\RestModel;

use Navplan\Track\DomainModel\Track;


class RestReadTrackResponseConverter {
    public static function toRest(Track $track): array {
        return array(
            "track" => RestTrackConverter::toRest($track)
        );
    }
}
