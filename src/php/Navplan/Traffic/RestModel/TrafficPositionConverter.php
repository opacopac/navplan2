<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Geometry\RestModel\Position4dConverter;
use Navplan\Geometry\RestModel\TimestampConverter;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class TrafficPositionConverter {
    public const ROUND_POS_TO_DIGITS = 6;
    public const ROUND_ALT_TO_DIGITS = 1;


    public static function toRest(TrafficPosition $trafficPos): array {
        return array(
            "position" => Position4dConverter::toRest($trafficPos->position, self::ROUND_POS_TO_DIGITS, self::ROUND_ALT_TO_DIGITS),
            "method" => TrafficPositionMethod::toString($trafficPos->method),
            "receiver" => $trafficPos->receiver,
            "timestamp" => TimestampConverter::toRest($trafficPos->receivedTimestamp)
        );
    }
}
