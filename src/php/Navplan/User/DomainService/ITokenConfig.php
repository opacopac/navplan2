<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Navplan\User\DomainModel\TokenCredentials;


interface ITokenConfig {
    function getTokenCredentials(): TokenCredentials;
}
