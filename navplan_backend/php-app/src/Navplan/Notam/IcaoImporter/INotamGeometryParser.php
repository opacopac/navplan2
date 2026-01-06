<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;


interface INotamGeometryParser
{
    function test(string $testNotamId): void;

    function go(): void;
}

