<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;


interface INotamConfig {
    function getIcaoApiKey(): string;
}
