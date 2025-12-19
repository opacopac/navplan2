<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondRaw;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondRawBuilder;


class MySqlDbCondRawBuilder implements IDbCondRawBuilder
{
    private DbCondRaw $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondRawBuilder
    {
        return new MySqlDbCondRawBuilder($dbService);
    }


    public function condition(DbCondRaw $cond): MySqlDbCondRawBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        return $this->cond->rawSql;
    }
}
