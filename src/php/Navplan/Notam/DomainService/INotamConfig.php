<?php declare(strict_types=1);

namespace Navplan\Notam\DomainService;


interface INotamConfig {
    function getIcaoApiKey(): string;
}
