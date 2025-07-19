<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseSimpleBuilder;


class MySqlDbWhereClauseSimpleBuilder implements IDbWhereClauseSimpleBuilder
{
    private DbWhereClauseSimple $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseSimpleBuilder
    {
        return new MySqlDbWhereClauseSimpleBuilder($dbService);
    }


    public function clause(DbWhereClauseSimple $clause): MySqlDbWhereClauseSimpleBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        // handle NULL values separately
        if ($this->clause->value === NULL) {
            if ($this->clause->operator === DbWhereOp::EQ) {
                return $this->clause->colName . " IS NULL";
            } else {
                return $this->clause->colName . " IS NOT NULL";
            }
        }

        $opStr = match ($this->clause->operator) {
            DbWhereOp::EQ => "=",
            DbWhereOp::NE => "!=",
            DbWhereOp::GT => ">",
            DbWhereOp::GT_OR_E => ">=",
            DbWhereOp::LT => "<",
            DbWhereOp::LT_OR_E => "<=",
        };

        $valStr = $this->clause->value;
        $valStr = match (true) {
            is_string($valStr) => DbHelper::getDbStringValue($this->dbService, $valStr),
            is_bool($valStr) => DbHelper::getDbBoolValue($valStr),
            is_int($valStr) => DbHelper::getDbIntValue($valStr),
            is_float($valStr) => DbHelper::getDbFloatValue($valStr),
            default => throw new InvalidArgumentException("Unsupported value type for where clause"),
        };

        return $this->clause->colName . " " . $opStr . " " . $valStr;
    }
}
