<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseTextBuilder;


class MySqlDbWhereClauseTextBuilder implements IDbWhereClauseTextBuilder
{
    private DbWhereText $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseTextBuilder
    {
        return new MySqlDbWhereClauseTextBuilder($dbService);
    }


    public function clause(DbWhereText $clause): MySqlDbWhereClauseTextBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        $opStr = "LIKE";

        $valStr = $this->clause->value;
        $valStr = match ($this->clause->operator) {
            DbWhereOpTxt::LIKE_PREFIX => $valStr . "%",
            DbWhereOpTxt::LIKE_SUFFIX => "%" . $valStr,
            DbWhereOpTxt::LIKE_SUBSTR => "%" . $valStr . "%",
        };
        $valStr = DbHelper::getDbStringValue($this->dbService, $valStr);

        return $this->clause->colName . " " . $opStr . " " . $valStr;
    }
}
