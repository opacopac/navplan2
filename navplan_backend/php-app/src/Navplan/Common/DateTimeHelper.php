<?php declare(strict_types=1);

namespace Navplan\Common;


class DateTimeHelper {
    public static function getIsoTimeString(?int $timestamp = null) {
        if (!$timestamp) {
            $timestamp = time();
        }

        return gmdate('Ymd\Th:i:s\Z', $timestamp);
    }
}
