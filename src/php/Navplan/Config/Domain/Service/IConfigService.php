<?php declare(strict_types=1);

namespace Navplan\Config\Domain\Service;

use Navplan\OpenAip\Config\IOpenAipConfigService;


interface IConfigService extends IOpenAipConfigService {
    function getIcaoApiKey(): string;

    function getAdsbExchangeApiKey(): string;
}
