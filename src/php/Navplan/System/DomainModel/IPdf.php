<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


interface IPdf {
    function saveAsImage(string $filename): void;
}
