<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClause;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseBuilder;


class MySqlDbWhereClauseBuilder implements IDbWhereClauseBuilder
{
    private DbWhereClause $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseBuilder
    {
        return new MySqlDbWhereClauseBuilder($dbService);
    }


    public function clause(DbWhereClause $clause): MySqlDbWhereClauseBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        $clause = $this->clause;

        return match (get_class($clause)) {
            DbWhereClauseSimple::class => MySqlDbWhereClauseSimpleBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereClauseText::class => MySqlDbWhereClauseTextBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereClauseMulti::class => MySqlDbWhereClauseMultiBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereClauseGeo::class => MySqlDbWhereClauseGeoBuilder::create($this->dbService)->clause($clause)->build(),
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }
}
