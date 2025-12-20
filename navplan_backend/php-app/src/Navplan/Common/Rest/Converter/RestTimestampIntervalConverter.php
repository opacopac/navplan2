<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\TimestampInterval;


class RestTimestampIntervalConverter {
    private const string ARG_TIMESTAMP_INTERVAL = "tsinterval";


    public static function fromRest(array $args): TimestampInterval {
        $interval = self::fromRestOrNull($args);
        if ($interval === null) {
            throw new InvalidArgumentException("Missing or invalid '" . self::ARG_TIMESTAMP_INTERVAL . "' parameter");
        }

        return $interval;
    }


    public static function fromRestOrNull(array $args): ?TimestampInterval {
        if (!isset($args[self::ARG_TIMESTAMP_INTERVAL]) || !is_string($args[self::ARG_TIMESTAMP_INTERVAL])) {
            return null;
        }

        $parts = explode(',', $args[self::ARG_TIMESTAMP_INTERVAL]);
        if (count($parts) !== 2) {
            return null;
        }

        return TimestampInterval::fromMs((int)$parts[0], (int)$parts[1]);
    }


    public static function toRest(TimestampInterval $interval): array {
        return [
            self::ARG_TIMESTAMP_INTERVAL => [
                $interval->start->toMs(),
                $interval->end->toMs()
            ]
        ];
    }
}
