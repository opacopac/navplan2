<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExpFunction;
use Navplan\System\DbQueryBuilder\Domain\Model\DbFunction;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbExpFunctionBuilder;


class MySqlDbExpFunctionBuilder implements IDbExpFunctionBuilder
{
    private DbExpFunction $exp;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbExpFunctionBuilder
    {
        return new MySqlDbExpFunctionBuilder($dbService);
    }


    public function expression(DbExpFunction $exp): MySqlDbExpFunctionBuilder
    {
        $this->exp = $exp;

        return $this;
    }


    public function build(): string
    {
        $exp = $this->exp;
        $functionName = $exp->function instanceof DbFunction
            ? $exp->function->name
            : $exp->function;
        $argNames = array_map(
            fn($arg) => $arg instanceof DbCol
                ? MySqlDbColBuilder::buildColName($arg)
                : DbHelper::getDbStringValue($this->dbService, $arg),
            $exp->args
        );

        return $functionName . '(' . implode(', ', $argNames) . ')';
    }
}
