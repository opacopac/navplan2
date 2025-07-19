<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;


class MySqlDbCaseBuilder
{
    /**
     * @var DbCond[]
     */
    private array $condList = [];
    /**
     * @var string[]
     */
    private array $thenList = [];
    private ?string $elseValue = null;

    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCaseBuilder
    {
        return new MySqlDbCaseBuilder($dbService);
    }


    public function when(DbCond $condition, string $thenValue): MySqlDbCaseBuilder
    {
        $this->condList[] = $condition;
        $this->thenList[] = $thenValue;

        return $this;
    }


    public function else(string $elseValue): MySqlDbCaseBuilder
    {
        $this->elseValue = $elseValue;

        return $this;
    }


    public function build(): string
    {
        if (count($this->condList) === 0) {
            throw new InvalidArgumentException("At least one when condition must be provided for the CASE statement.");
        }

        $caseStr = "CASE";

        foreach ($this->condList as $index => $condition) {
            $condStr = MySqlDbCondBuilder::create($this->dbService)
                ->condition($condition)
                ->build();
            $caseStr .= " WHEN " . $condStr . " THEN " . $this->thenList[$index];
        }

        if ($this->elseValue !== null) {
            $caseStr .= " ELSE " . $this->elseValue;
        }

        $caseStr .= " END";

        return $caseStr;
    }
}
