<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondBuilder;


class MySqlDbCondBuilder implements IDbCondBuilder
{
    private DbCond $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondBuilder
    {
        return new MySqlDbCondBuilder($dbService);
    }


    public function condition(DbCond $cond): MySqlDbCondBuilder
    {
        $this->cond = $cond;

        return $this;
    }


    public function build(): string
    {
        $cond = $this->cond;

        return match (get_class($cond)) {
            DbCondSimple::class => MySqlDbCondSimpleBuilder::create($this->dbService)->condition($cond)->build(),
            DbCondText::class => MySqlDbCondTextBuilder::create($this->dbService)->condition($cond)->build(),
            DbCondMulti::class => MySqlDbCondMultiBuilder::create($this->dbService)->condition($cond)->build(),
            DbCondGeo::class => MySqlDbCondGeoBuilder::create($this->dbService)->condition($cond)->build(),
            DbCondIn::class => MySqlDbCondInBuilder::create($this->dbService)->condition($cond)->build(),
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }
}
