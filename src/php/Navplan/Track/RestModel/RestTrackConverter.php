<?php declare(strict_types=1);

namespace Navplan\Track\RestModel;

use Navplan\Common\RestModel\RestPosition4dConverter;
use Navplan\Common\RestModel\RestTimestampConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Track\DomainModel\Track;


class RestTrackConverter {
    public static function fromRest(array $args): Track {
        return new Track(
            StringNumberHelper::parseIntOrError($args, "id"),
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
}
