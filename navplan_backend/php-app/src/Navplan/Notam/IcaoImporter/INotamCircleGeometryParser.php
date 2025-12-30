<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Circle2d;


interface INotamCircleGeometryParser
{
    function tryParseCircleFromMessageVariant1(string $message): ?Circle2d;

    function tryParseCircleFromMessageVariant2(string $message): ?Circle2d;

    function tryParseCircleFromMessageVariant3(string $message): ?Circle2d;
}

