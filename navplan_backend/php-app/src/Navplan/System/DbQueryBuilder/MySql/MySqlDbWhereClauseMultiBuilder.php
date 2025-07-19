<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereCombinator;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseMultiBuilder;


class MySqlDbWhereClauseMultiBuilder implements IDbWhereClauseMultiBuilder
{
    private DbWhereClauseMulti $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseMultiBuilder
    {
        return new MySqlDbWhereClauseMultiBuilder($dbService);
    }


    public function clause(DbWhereClauseMulti $clause): MySqlDbWhereClauseMultiBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        $clauseStrs = array_map(function ($subClause) {
            return MySqlDbWhereClauseBuilder::create($this->dbService)->clause($subClause)->build();
        }, $this->clause->clauses);

        $combinatorStr = match ($this->clause->combinator) {
            DbWhereCombinator::AND => "AND",
            DbWhereCombinator::OR => "OR"
        };

        return "(" . implode(" " . $combinatorStr . " ", $clauseStrs) . ")";
    }
}
