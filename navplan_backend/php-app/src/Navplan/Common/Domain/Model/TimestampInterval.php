<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class TimestampInterval {
    public function __construct(
        public Timestamp $start,
        public Timestamp $end
    ) {
    }


    public static function fromMs(int $startMs, int $endMs): TimestampInterval {
        return new TimestampInterval(
            Timestamp::fromMs($startMs),
            Timestamp::fromMs($endMs)
        );
    }


    public static function fromS(int $startS, int $endS): TimestampInterval {
        return new TimestampInterval(
            Timestamp::fromS($startS),
            Timestamp::fromS($endS)
        );
    }
}
