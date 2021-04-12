<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnRepo;

use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class OgnRepoTrafficConverter {
    public static function fromDumpFileLine(string $line, ITimeService $timeService): TrafficOgn {
        $msg = json_decode($line, true);

        return new TrafficOgn(
            new TrafficAddress(
                $msg["id"],
                TrafficAddressType::fromString($msg["addresstype"])
            ),
            TrafficAcType::fromString($msg["actype"]),
            [OgnRepoTrafficPositionConverter::fromDumpFileLine($line, $timeService)]
        );
    }
}
