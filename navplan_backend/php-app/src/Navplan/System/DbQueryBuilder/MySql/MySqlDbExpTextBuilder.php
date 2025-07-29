<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExpText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbExpTextBuilder;


class MySqlDbExpTextBuilder implements IDBexpTextBuilder
{
    private DbExpText $exp;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbExpTextBuilder
    {
        return new MySqlDbExpTextBuilder($dbService);
    }


    public function expression(DbExpText $exp): MySqlDbExpTextBuilder
    {
        $this->exp = $exp;

        return $this;
    }


    public function build(): string
    {
        return $this->exp->text;
    }




    /*public function build(): string
    {
        $functionName = $this->function instanceof DbFunction
            ? $this->function->name
            : $this->function;
        $argNames = array_map(
            fn($arg) => $arg instanceof DbCol
                ? MySqlDbColBuilder::buildColName($arg)
                : $arg,
            $this->args
        );

        return $functionName . '(' . implode(', ', $argNames) . ')';
    }*/
}
