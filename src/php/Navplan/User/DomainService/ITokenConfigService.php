<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Navplan\User\DomainModel\TokenConfig;


interface ITokenConfigService {
    function getTokenConfig(): TokenConfig;
}
