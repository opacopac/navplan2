<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbWhereClauseSimpleBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbWhereClauseSimpleBuilderTest extends TestCase
{
    private MySqlDbWhereClauseSimpleBuilder $whereClauseBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->whereClauseBuilder = MySqlDbWhereClauseSimpleBuilder::create($mockDbService);
    }


    public function test_text()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, "value1");
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $clauseStr = $wcb->build();

        // then
        $this->assertEquals("col1 = 'value1'", $clauseStr);
    }


    public function test_int()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, 123);
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 = '123'", $query);
    }


    public function test_float()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, -123.456);
        $wb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = '-123.456'", $query);
    }


    public function test_bool_true()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, true);
        $wb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = '1'", $query);
    }


    public function test_bool_false()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, false);
        $wb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = '0'", $query);
    }


    public function test_null()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::EQ, null);
        $wb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 IS NULL", $query);
    }


    public function test_not_null()
    {
        // given
        $clause = DbWhereSimple::create("col1", DbWhereOp::NE, null);
        $wb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 IS NOT NULL", $query);
    }
}
