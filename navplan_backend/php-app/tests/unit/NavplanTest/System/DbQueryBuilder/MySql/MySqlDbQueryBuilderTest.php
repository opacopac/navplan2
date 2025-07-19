<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
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
            ->whereAll([
                ["col1", DbWhereOp::EQ, true],
                ["col2", DbWhereOp::GT, 456],
                ["col3", DbWhereOp::LT_OR_E, 789]
            ]);

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
            ->whereAny([
                ["col1", DbWhereOp::NE, 123],
                ["col2", DbWhereOp::LT, 456],
                ["col3", DbWhereOp::GT_OR_E, 789]
            ]);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE (col1 != '123' OR col2 < '456' OR col3 >= '789')", $query);
    }


    public function test_select_with_generic_where()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereClause(
                DbWhereClauseMulti::create(DbWhereCombinator::AND,
                    DbWhereClauseMulti::create(DbWhereCombinator::OR,
                        DbWhereClauseSimple::create("col1", DbWhereOp::EQ, "value1"),
                        DbWhereClauseSimple::create("col2", DbWhereOp::EQ, 456)
                    ),
                    DbWhereClauseSimple::create("col3", DbWhereOp::NE, null)
                )
            );

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE ((col1 = 'value1' OR col2 = '456') AND col3 IS NOT NULL)", $query);
    }


    public function test_order_by_asc()
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
