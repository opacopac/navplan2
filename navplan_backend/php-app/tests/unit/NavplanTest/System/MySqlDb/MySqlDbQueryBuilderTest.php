<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use Navplan\System\Domain\Model\DbWhereClauseFactory;
use Navplan\System\MySqlDb\MySqlDbQueryBuilder;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbQueryBuilderTest extends TestCase
{
    private MysqlDbQueryBuilder $mySqlDbQueryBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->mySqlDbQueryBuilder = new MySqlDbQueryBuilder($mockDbService);
    }


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


    public function test_simple_select_with_text_where()
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


    public function test_simple_select_with_int_where()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", 123);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = 123", $query);
    }


    public function test_select_with_null_where()
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


    public function test_select_with_not_null_where()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereNotEquals("col1", null);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 IS NOT NULL", $query);
    }


    public function test_select_with_multiple_where()
    {
        // given
        $w = new DbWhereClauseFactory();
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->where($w->and(
                $w->equals("col1", "value1"),
                $w->equals("col2", 456)
            ));

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE (col1 = 'value1' AND col2 = 456)", $query);
    }
}
