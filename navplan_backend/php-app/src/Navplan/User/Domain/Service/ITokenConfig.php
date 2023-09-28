<?php declare(strict_types=1);

namespace Navplan\User\Domain\Service;

use Navplan\User\Domain\Model\TokenCredentials;


interface ITokenConfig {
    function getTokenCredentials(): TokenCredentials;
}
