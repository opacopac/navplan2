<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain\Service;


interface IOpenAipConfigService {
    function getOpenAipClientIdToken(): string;
}
