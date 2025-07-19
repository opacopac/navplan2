<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbQueryBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbQueryBuilderTest extends TestCase
{
    private MysqlDbQueryBuilder $mySqlDbQueryBuilder;
    private MockDbService $mockDbService;


    protected function setUp(): void
    {
        parent::setUp();

        $this->mockDbService = new MockDbService();
        $this->mySqlDbQueryBuilder = MySqlDbQueryBuilder::create($this->mockDbService);
    }


    public function test_select_all()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table", $query);
    }


    public function test_select_from()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectFrom("test_table", "col1", "col2", "col3");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT col1, col2, col3 FROM test_table", $query);
    }


    public function test_where_equals()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = 'value1'", $query);
    }


    public function test_where_prefix_like()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->wherePrefixLike("col1", "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 LIKE 'value1%'", $query);
    }


    public function test_where_all()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereAll(
                DbCondSimple::create("col1", DbCondOp::EQ, true),
                DbCondSimple::create("col2", DbCondOp::GT, 456),
                DbCondSimple::create("col3", DbCondOp::LT_OR_E, 789),
            );

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE (col1 = '1' AND col2 > '456' AND col3 <= '789')", $query);
    }


    public function test_where_any()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereAny(
                DbCondSimple::create("col1", DbCondOp::NE, 123),
                DbCondSimple::create("col2", DbCondOp::LT, 456),
                DbCondSimple::create("col3", DbCondOp::GT_OR_E, 789),
            );

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE (col1 != '123' OR col2 < '456' OR col3 >= '789')", $query);
    }


    public function test_generic_where_clause()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereCondition(
                DbCondMulti::create(DbCondCombinator::AND,
                    DbCondMulti::create(DbCondCombinator::OR,
                        DbCondSimple::equals("col1", "value1"),
                        DbCondSimple::equals("col2", 456)
                    ),
                    DbCondSimple::create("col3", DbCondOp::NE, null)
                )
            );

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE ((col1 = 'value1' OR col2 = '456') AND col3 IS NOT NULL)", $query);
    }


    public function test_where_in_max_dist()
    {
        // given
        $pos = new Position2d(7.5, 47.5);
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereInMaxDist("lat", "lon", $pos, 0.5);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE (lat > '47' AND lat < '48' AND lon > '7' AND lon < '8')", $query);
    }


    public function test_order_by()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->orderBy("col1", DbSortOrder::ASC)
            ->orderBy("col2", DbSortOrder::DESC);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table ORDER BY col1 ASC, col2 DESC", $query);
    }


    public function test_order_by_lat_lon_dist()
    {
        // given
        $pos = new Position2d(7.5, 47.5);
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->orderByLatLonDist("lat", "lon", $pos);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table ORDER BY ((lat - 47.5) * (lat - 47.5) + (lon - 7.5) * (lon - 7.5)) ASC", $query);
    }


    public function test_limit()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->limit(10);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table LIMIT 10", $query);
    }
}
