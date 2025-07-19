<?php declare(strict_types=1);

namespace Navplan\System\Db\MySql;


class DbCredentials
{
    public function __construct(
        public string $host,
        public string $user,
        public string $pw,
        public string $database,
    ) {
    }
}
