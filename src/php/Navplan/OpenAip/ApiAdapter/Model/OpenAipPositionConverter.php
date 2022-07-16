<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Common\DomainModel\Position2d;


class OpenAipPositionConverter {
    public static function fromRestCoordinates(array $restCoordinates): Position2d {
        return new Position2d(
            $restCoordinates[0],
            $restCoordinates[1]
        );
    }


    public static function fromRestPointGeometry(array $restGeometry): Position2d {
        $coordinates = $restGeometry["coordinates"];

        return self::fromRestCoordinates($coordinates);
    }
}
