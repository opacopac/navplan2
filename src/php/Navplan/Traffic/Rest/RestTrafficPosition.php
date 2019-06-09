<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\Traffic\Domain\TrafficDataSource;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;


class RestTrafficPosition {
    public const ROUND_POS_TO_DIGITS = 6;


    public static function toRest(TrafficPosition $trafficPos): array {
        return array(
            "position" => RestPosition2d::toRest($trafficPos->position, self::ROUND_POS_TO_DIGITS),
            "source" => TrafficDataSource::toString($trafficPos->source),
            "method" => TrafficPositionMethod::toString($trafficPos->method),
            "receiver" => $trafficPos->receiver,
            "timestamp" => $trafficPos->received
        );
    }
}
