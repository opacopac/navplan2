<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnRepo;

use Navplan\System\UseCase\ITimeService;
use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficOgn;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class OgnRepoTraffic {
    public static function fromDumpFileLine(string $line, ITimeService $timeService): TrafficOgn {
        $msg = json_decode($line, true);

        return new TrafficOgn(
            new TrafficAddress(
                $msg["id"],
                TrafficAddressType::fromString($msg["addresstype"])
            ),
            TrafficAcType::fromString($msg["actype"]),
            [OgnRepoTrafficPosition::fromDumpFileLine($line, $timeService)]
        );
    }
}
