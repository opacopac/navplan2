<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondMultiBuilder;


class MySqlDbCondMultiBuilder implements IDbCondMultiBuilder
{
    private DbCondMulti $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondMultiBuilder
    {
        return new MySqlDbCondMultiBuilder($dbService);
    }


    public function condition(DbCondMulti $cond): MySqlDbCondMultiBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        $clauseStrs = array_map(function ($subClause) {
            return MySqlDbCondBuilder::create($this->dbService)->condition($subClause)->build();
        }, $this->cond->conditions);

        $combinatorStr = match ($this->cond->combinator) {
            DbCondCombinator::AND => "AND",
            DbCondCombinator::OR => "OR"
        };

        return "(" . implode(" " . $combinatorStr . " ", $clauseStrs) . ")";
    }
}
