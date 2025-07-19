<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbWhereClauseGeoBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbWhereClauseGeoBuilderTest extends TestCase
{
    private MySqlDbWhereClauseGeoBuilder $whereClauseBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->whereClauseBuilder = MySqlDbWhereClauseGeoBuilder::create($mockDbService);
    }


    public function test_intersects_st()
    {
        // given
        $pos = new Position2d(7.5, 47.5);
        $clause = DbWhereGeo::create("col1", DbWhereOpGeo::INTERSECTS_ST, $pos);
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("ST_Intersects(col1, ST_GeomFromText('POINT(7.5 47.5)'))", $query);
    }

    public function test_intersects_mbr()
    {
        // given
        $dbPoint = new Position2d(7.5, 47.5);
        $clause = DbWhereGeo::create("col1", DbWhereOpGeo::INTERSECTS_MBR, $dbPoint);
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("MBRIntersects(col1, ST_GeomFromText('POINT(7.5 47.5)'))", $query);
    }
}
