<?php declare(strict_types=1);

namespace Navplan\Notam\DomainService;


interface INotamConfigService {
    function getIcaoApiKey(): string;
}
