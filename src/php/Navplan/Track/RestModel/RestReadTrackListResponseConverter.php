<?php declare(strict_types=1);

namespace Navplan\Track\RestModel;


class RestReadTrackListResponseConverter {
    public static function toRest(array $trackList): array {
        return array(
            "tracks" => RestTrackConverter::toRestList($trackList)
        );
    }
}
