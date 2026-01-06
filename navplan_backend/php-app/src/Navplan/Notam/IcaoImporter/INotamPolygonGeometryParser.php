<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Ring2d;


interface INotamPolygonGeometryParser
{
    function tryParsePolygon(string $text): ?Ring2d;
}
