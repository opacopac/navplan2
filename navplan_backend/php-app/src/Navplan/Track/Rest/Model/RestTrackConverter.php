<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Model;

use Navplan\Common\Rest\Converter\RestPosition4dConverter;
use Navplan\Common\Rest\Converter\RestTimestampConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Track\Domain\Model\Track;


class RestTrackConverter {
    public static function fromRest(array $args, int $id = -1): Track {
        return new Track(
            $id,
            StringNumberHelper::parseStringOrNull($args, "name"),
            RestPosition4dConverter::fromRestList($args["positions"]),
            RestTimestampConverter::fromRest($args["savetime"]),
        );
    }


    public static function toRest(Track $track): array {
        return array(
            "id" => $track->id,
            "name" => $track->name,
            "positions" => RestPosition4dConverter::toRestList($track->positionList),
            "savetime" => RestTimestampConverter::toRest($track->saveTime),
        );
    }


    /**
     * @param Track[] $trackList
     * @return array
     */
    public static function toRestList(array $trackList): array {
        return array_map(
            function ($track) { return self::toRest($track); },
            $trackList
        );
    }
}
