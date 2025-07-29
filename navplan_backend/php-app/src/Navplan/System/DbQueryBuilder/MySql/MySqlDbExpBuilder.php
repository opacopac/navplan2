<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExpFunction;
use Navplan\System\DbQueryBuilder\Domain\Model\DbExpText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbExpBuilder;


class MySqlDbExpBuilder implements IDbExpBuilder
{
    private DbExp $exp;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbExpBuilder
    {
        return new MySqlDbExpBuilder($dbService);
    }


    public function expression(DbExp $exp): MySqlDbExpBuilder
    {
        $this->exp = $exp;

        return $this;
    }


    public function build(): string
    {
        $exp = $this->exp;

        return match (get_class($exp)) {
            DbExpText::class => MySqlDbExpTextBuilder::create($this->dbService)->expression($exp)->build(),
            DbExpFunction::class => MySqlDbExpFunctionBuilder::create($this->dbService)->expression($exp)->build(),
            default => throw new InvalidArgumentException("Unsupported expression type"),
        };
    }
}
