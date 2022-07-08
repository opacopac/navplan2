<?php declare(strict_types=1);

namespace Navplan\DataImport\OpenAip\RestModel;

use InvalidArgumentException;
use Navplan\Enroute\DomainModel\NavaidType;


class OpenAipRestNavaidTypeConverter {
    public static function fromRest(int $restNavaidType): NavaidType {
        switch ($restNavaidType) {
            case 0 : return NavaidType::DME;
            case 1 : return NavaidType::TACAN;
            case 2 : return NavaidType::NDB;
            case 3 : return NavaidType::VOR;
            case 4 : return NavaidType::VOR_DME;
            case 5 : return NavaidType::VORTAC;
            case 6 : return NavaidType::DVOR;
            case 7 : return NavaidType::DVOR_DME;
            case 8 : return NavaidType::DVORTAC;
        }

        throw new InvalidArgumentException("unknown navaid type '" . $restNavaidType . "'");
    }
}
