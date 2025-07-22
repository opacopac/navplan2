<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondTextBuilder;


class MySqlDbCondTextBuilder implements IDbCondTextBuilder
{
    private DbCondText $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondTextBuilder
    {
        return new MySqlDbCondTextBuilder($dbService);
    }


    public function condition(DbCondText $cond): MySqlDbCondTextBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        $colName = MySqlDbColBuilder::buildColName($this->cond->column);

        $opStr = "LIKE";

        $valStr = $this->cond->value;
        $valStr = match ($this->cond->operator) {
            DbCondOpTxt::LIKE_PREFIX => $valStr . "%",
            DbCondOpTxt::LIKE_SUFFIX => "%" . $valStr,
            DbCondOpTxt::LIKE_SUBSTR => "%" . $valStr . "%",
        };
        $valStr = DbHelper::getDbStringValue($this->dbService, $valStr);

        return $colName . " " . $opStr . " " . $valStr;
    }
}
