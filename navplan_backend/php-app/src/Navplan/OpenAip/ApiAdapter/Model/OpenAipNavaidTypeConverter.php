<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Navaid\Domain\Model\NavaidType;


class OpenAipNavaidTypeConverter {
    public static function fromRest(int $restNavaidType): NavaidType {
        return match ($restNavaidType) {
            0 => NavaidType::DME,
            1 => NavaidType::TACAN,
            2 => NavaidType::NDB,
            3 => NavaidType::VOR,
            4 => NavaidType::VOR_DME,
            5 => NavaidType::VORTAC,
            6 => NavaidType::DVOR,
            7 => NavaidType::DVOR_DME,
            8 => NavaidType::DVORTAC,
            default => throw new InvalidArgumentException("unknown navaid type '" . $restNavaidType . "'"),
        };
    }
}
