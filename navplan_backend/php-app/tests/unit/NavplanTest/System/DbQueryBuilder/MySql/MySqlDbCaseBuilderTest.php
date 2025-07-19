<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbCaseBuilderTest extends TestCase
{
    private MockDbService $mockDbService;


    protected function setUp(): void
    {
        parent::setUp();

        $this->mockDbService = new MockDbService();
    }


    public function test_case_when_else()
    {
        // given
        $cb = MySqlDbCaseBuilder::create($this->mockDbService)
            ->when(DbCondSimple::create("col1", DbCondOp::EQ, "value1"), "then_value1")
            ->when(DbCondSimple::create("col2", DbCondOp::EQ, "value2"), "then_value2")
            ->else("else_value");

        // when
        $query = $cb->build();

        // then
        $this->assertEquals("CASE WHEN col1 = 'value1' THEN then_value1 WHEN col2 = 'value2' THEN then_value2 ELSE else_value END", $query);
    }


    public function test_case_no_else()
    {
        // given
        $cb = MySqlDbCaseBuilder::create($this->mockDbService)
            ->when(DbCondSimple::create("col1", DbCondOp::EQ, "value1"), "then_value1")
            ->when(DbCondSimple::create("col2", DbCondOp::EQ, "value2"), "then_value2");

        // when
        $query = $cb->build();

        // then
        $this->assertEquals("CASE WHEN col1 = 'value1' THEN then_value1 WHEN col2 = 'value2' THEN then_value2 END", $query);
    }


    public function test_case_when_equals()
    {
        // given
        $cb = MySqlDbCaseBuilder::create($this->mockDbService)
            ->whenEquals("col1", "value1", "then_value1");

        // when
        $query = $cb->build();

        // then
        $this->assertEquals("CASE WHEN col1 = 'value1' THEN then_value1 END", $query);
    }


    public function test_case_when_all()
    {
        // given
        $cb = MySqlDbCaseBuilder::create($this->mockDbService)
            ->whenAll([
                DbCondSimple::create("col1", DbCondOp::EQ, "value1"),
                DbCondSimple::create("col2", DbCondOp::EQ, "value2")
            ], "then_value");

        // when
        $query = $cb->build();

        // then
        $this->assertEquals("CASE WHEN col1 = 'value1' AND col2 = 'value2' THEN then_value END", $query);
    }
}
