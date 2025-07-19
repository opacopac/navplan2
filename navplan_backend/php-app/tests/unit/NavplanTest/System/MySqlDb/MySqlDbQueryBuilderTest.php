<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseFactory;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbQueryBuilder;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbQueryBuilderTest extends TestCase
{
    private MysqlDbQueryBuilder $mySqlDbQueryBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->mySqlDbQueryBuilder = MySqlDbQueryBuilder::create($mockDbService);
    }


    // region select tests

    public function test_simple_select_all()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table", $query);
    }


    // endregion


    // region single where tests

    public function test_single_where_text()
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


    public function test_single_where_int()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", 123);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = '123'", $query);
    }


    public function test_single_where_float()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", -123.456);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = '-123.456'", $query);
    }


    public function test_single_where_bool_true()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", true);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = '1'", $query);
    }


    public function test_single_where_bool_false()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", false);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = '0'", $query);
    }


    public function test_single_where_null()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", null);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 IS NULL", $query);
    }


    public function test_single_where_not_null()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->where("col1", DbWhereOp::NE, null);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 IS NOT NULL", $query);
    }

    // endregion


    // region text where tests

    public function test_single_where_like_prefix()
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


    public function test_single_where_like_suffix()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereText("col1", DbWhereOpTxt::LIKE_SUFFIX, "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 LIKE '%value1'", $query);
    }


    public function test_single_where_like_substring()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereText("col1", DbWhereOpTxt::LIKE_SUBSTR, "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 LIKE '%value1%'", $query);
    }


    // endregion


    // region geo where tests

    public function test_geo_where_intersects_st()
    {
        // given
        $dbPoint = new Position2d(7.5, 47.5);
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereGeo("col1", DbWhereOpGeo::INTERSECTS_ST, $dbPoint);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE ST_Intersects(col1, ST_GeomFromText('POINT(7.5 47.5)'))", $query);
    }

    public function test_geo_where_intersects_mbr()
    {
        // given
        $dbPoint = new Position2d(7.5, 47.5);
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereGeo("col1", DbWhereOpGeo::INTERSECTS_MBR, $dbPoint);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE MBRIntersects(col1, ST_GeomFromText('POINT(7.5 47.5)'))", $query);
    }

    // endregion


    // region multiple where tests

    public function test_select_with_multiple_and()
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


    public function test_select_with_multiple_or()
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
        $w = new DbWhereClauseFactory();
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereClause($w->and(
                $w->or(
                    $w->equals("col1", "value1"),
                    $w->equals("col2", 456)
                ),
                $w->notEquals("col3", null)
            ));

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE ((col1 = 'value1' OR col2 = '456') AND col3 IS NOT NULL)", $query);
    }

    // endregion


    // region order by tests

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

    // endregion


    // region limit tests

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

    // endregion
}
