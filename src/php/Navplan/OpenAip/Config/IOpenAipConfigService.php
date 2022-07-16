<?php declare(strict_types=1);

namespace Navplan\OpenAip\Config;


interface IOpenAipConfigService {
    function getOpenAipClientIdToken(): string;
}
