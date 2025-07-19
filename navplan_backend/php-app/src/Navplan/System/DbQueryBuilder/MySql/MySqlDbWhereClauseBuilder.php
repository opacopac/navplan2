<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhere;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseBuilder;


class MySqlDbWhereClauseBuilder implements IDbWhereClauseBuilder
{
    private DbWhere $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseBuilder
    {
        return new MySqlDbWhereClauseBuilder($dbService);
    }


    public function clause(DbWhere $clause): MySqlDbWhereClauseBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        $clause = $this->clause;

        return match (get_class($clause)) {
            DbWhereSimple::class => MySqlDbWhereClauseSimpleBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereText::class => MySqlDbWhereClauseTextBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereMulti::class => MySqlDbWhereClauseMultiBuilder::create($this->dbService)->clause($clause)->build(),
            DbWhereGeo::class => MySqlDbWhereClauseGeoBuilder::create($this->dbService)->clause($clause)->build(),
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }
}
