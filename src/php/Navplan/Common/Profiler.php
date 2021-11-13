<?php declare(strict_types=1);

namespace Navplan\Common;


class Profiler {
    const PRECISION_DIGITS = 6;
    public static float $startTimestamp = 0;
    public static float $lastTimestamp = 0;


    public static function start(): void {
        self::$startTimestamp = microtime(true);
        self::$lastTimestamp = self::$startTimestamp;
    }


    public static function elapsed(string $text = ""): void {
        $timestamp = microtime(true);
        print
            "total: " . round($timestamp - self::$startTimestamp, self::PRECISION_DIGITS) . " " .
            "delta: " . round($timestamp - self::$lastTimestamp, self::PRECISION_DIGITS) .
            ": " . $text . "\n";
        self::$lastTimestamp = $timestamp;
    }
}
