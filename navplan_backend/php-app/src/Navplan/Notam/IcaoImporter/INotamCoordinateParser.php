<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Position2d;


interface INotamCoordinateParser
{
    function getLonLatFromGradMinSecStrings(
        string $latGrad,
        string $latMin,
        string $latSec,
        string $latDir,
        string $lonGrad,
        string $lonMin,
        string $lonSec,
        string $lonDir
    ): Position2d;

    function normalizeCoordinates($text);
}
