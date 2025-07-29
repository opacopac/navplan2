<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExp;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondSimpleBuilder;


class MySqlDbCondSimpleBuilder implements IDbCondSimpleBuilder
{
    private DbCondSimple $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondSimpleBuilder
    {
        return new MySqlDbCondSimpleBuilder($dbService);
    }


    public function condition(DbCondSimple $cond): MySqlDbCondSimpleBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        $colName = MySqlDbColBuilder::buildColName($this->cond->column);

        // handle NULL values separately
        if ($this->cond->value === NULL) {
            if ($this->cond->operator === DbCondOp::EQ) {
                return $colName . " IS NULL";
            } else {
                return $colName . " IS NOT NULL";
            }
        }

        $opStr = match ($this->cond->operator) {
            DbCondOp::EQ => "=",
            DbCondOp::NE => "!=",
            DbCondOp::GT => ">",
            DbCondOp::GT_OR_E => ">=",
            DbCondOp::LT => "<",
            DbCondOp::LT_OR_E => "<=",
        };

        $valStr = $this->cond->value;
        $valStr = match (true) {
            $valStr instanceof DbExp => MySqlDbExpBuilder::create($this->dbService)->expression($valStr)->build(),
            $valStr instanceof DbCol => MySqlDbColBuilder::buildColName($valStr),
            is_string($valStr) => DbHelper::getDbStringValue($this->dbService, $valStr),
            is_bool($valStr) => DbHelper::getDbBoolValue($valStr),
            is_int($valStr) => DbHelper::getDbIntValue($valStr),
            is_float($valStr) => DbHelper::getDbFloatValue($valStr),
            default => throw new InvalidArgumentException("Unsupported value type for where clause"),
        };

        return $colName . " " . $opStr . " " . $valStr;
    }
}
