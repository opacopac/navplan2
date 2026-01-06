<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;


interface INotamAltitudeLinesParser
{
    /**
     * detect bottom / top height in F) and G) line of message: ...F) SFC G) 500FT AGL...
     *
     * @param string $notamText
     * @return Altitude[]|null
     */
    function tryParseAltitudesFromGAndFLines(string $notamText): ?array;
}

