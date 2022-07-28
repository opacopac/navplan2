<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;


interface IDbConfigService {
    function getCredentials(): DbCredentials;
}
