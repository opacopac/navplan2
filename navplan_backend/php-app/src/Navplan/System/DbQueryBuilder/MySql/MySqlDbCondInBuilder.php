<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondInBuilder;


class MySqlDbCondInBuilder implements IDbCondInBuilder
{
    private DbCondIn $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondInBuilder
    {
        return new MySqlDbCondInBuilder($dbService);
    }


    public function condition(DbCondIn $cond): MySqlDbCondInBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        $colName = MySqlDbColBuilder::buildColName($this->cond->column);
        
        if (empty($this->cond->values)) {
            return "1=0"; // Empty IN clause always false
        }

        $escapedValues = array_map(function ($value) {
            if (is_string($value)) {
                return "'" . $this->dbService->escapeString($value) . "'";
            } elseif (is_bool($value)) {
                return $value ? "1" : "0";
            } elseif ($value === null) {
                return "NULL";
            } else {
                return (string)$value;
            }
        }, $this->cond->values);

        return $colName . " IN (" . implode(", ", $escapedValues) . ")";
    }
}
