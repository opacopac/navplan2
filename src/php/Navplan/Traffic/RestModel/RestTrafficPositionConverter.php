<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Common\Rest\Converter\RestPosition4dConverter;
use Navplan\Common\Rest\Converter\RestTimestampConverter;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class RestTrafficPositionConverter {
    public const ROUND_POS_TO_DIGITS = 6;
    public const ROUND_ALT_TO_DIGITS = 1;


    public static function toRest(TrafficPosition $trafficPos): array {
        return array(
            "position" => RestPosition4dConverter::toRest($trafficPos->position, self::ROUND_POS_TO_DIGITS, self::ROUND_ALT_TO_DIGITS),
            "method" => TrafficPositionMethod::toString($trafficPos->method),
            "receiver" => $trafficPos->receiver,
            "timestamp" => RestTimestampConverter::toRest($trafficPos->receivedTimestamp)
        );
    }
}
