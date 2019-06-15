<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnGateway;

use Navplan\System\UseCase\ITimeService;
use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class OgnTraffic {
    public static function fromDumpFileLine(string $line, ITimeService $timeService): Traffic {
        $msg = json_decode($line, true);

        return new Traffic(
            $msg["id"],
            TrafficAddressType::fromString($msg["addresstype"]),
            TrafficAcType::fromString($msg["actype"]),
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            [OgnTrafficPosition::fromDumpFileLine($line, $timeService)]
        );
    }
}