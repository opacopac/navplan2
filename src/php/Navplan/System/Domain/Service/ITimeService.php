<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


interface ITimeService {
    function strtotime(string $time): ?int;

    function currentTimestampSec(): int;

    function dateFormat(string $format, null|int $timestamp = null): string;
}
