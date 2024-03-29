<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;


class OpenAipPolygonConverter {
    public static function fromRestCoordinatesList(array $restCoordinatesList): Ring2d {
        $positions = array_map(
            function ($restCoord) { return new Position2d($restCoord[0], $restCoord[1]); },
            $restCoordinatesList[0]
        );

        return new Ring2d($positions);
    }


    public static function fromRestPolygonGeometry(array $restGeometry): Ring2d {
        $coordinates = $restGeometry["coordinates"];

        return self::fromRestCoordinatesList($coordinates);
    }
}
