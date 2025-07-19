<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;


use Navplan\System\Db\MySql\DbCredentials;

interface IDbConfig {
    function getCredentials(): DbCredentials;
}
