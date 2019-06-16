<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Geometry\Rest\RestPosition4d;
use Navplan\Geometry\Rest\RestTimestamp;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;


class RestTrafficPosition {
    public const ROUND_POS_TO_DIGITS = 6;
    public const ROUND_ALT_TO_DIGITS = 1;


    public static function toRest(TrafficPosition $trafficPos): array {
        return array(
            "position" => RestPosition4d::toRest($trafficPos->position, self::ROUND_POS_TO_DIGITS, self::ROUND_ALT_TO_DIGITS),
            "method" => TrafficPositionMethod::toString($trafficPos->method),
            "receiver" => $trafficPos->receiver,
            "timestamp" => RestTimestamp::toRest($trafficPos->receivedTimestamp)
        );
    }
}
